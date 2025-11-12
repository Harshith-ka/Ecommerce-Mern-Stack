import express from 'express';
import auth from '../middleware/auth.js';
import adminAuth from '../middleware/adminAuth.js';
import Product from '../models/Product.js';
import Order from '../models/Order.js';
import User from '../models/User.js';
import Review from '../models/Review.js';

const router = express.Router();

// Get admin dashboard statistics
router.get('/dashboard/stats', auth, adminAuth, async (req, res) => {
  try {
    // Total orders and revenue
    const totalOrders = await Order.countDocuments();
    const revenueResult = await Order.aggregate([
      { $match: { isPaid: true } },
      { $group: { _id: null, total: { $sum: '$totalPrice' } } }
    ]);
    const totalRevenue = revenueResult[0]?.total || 0;

    // Total products and users
    const totalProducts = await Product.countDocuments();
    const totalUsers = await User.countDocuments({ role: 'user' });
    
    // Pending orders
    const pendingOrders = await Order.countDocuments({ status: 'pending' });

    // Recent orders
    const recentOrders = await Order.find()
      .populate('user', 'name email')
      .sort({ createdAt: -1 })
      .limit(5);

    // Sales data for chart (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const salesData = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: thirtyDaysAgo },
          isPaid: true
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          totalSales: { $sum: '$totalPrice' },
          orders: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // Format sales data for frontend
    const formattedSalesData = salesData.map(item => ({
      date: item._id,
      totalSales: item.totalSales,
      orders: item.orders
    }));

    res.json({
      totalOrders,
      totalRevenue,
      totalProducts,
      totalUsers,
      pendingOrders,
      recentOrders,
      salesData: formattedSalesData
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all orders with filters
router.get('/orders', auth, adminAuth, async (req, res) => {
  try {
    const { status, page = 1, limit = 10, search } = req.query;
    
    let query = {};
    
    if (status && status !== 'all') {
      query.status = status;
    }
    
    if (search) {
      const users = await User.find({
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } }
        ]
      }).select('_id');
      
      query.user = { $in: users.map(user => user._id) };
    }

    const orders = await Order.find(query)
      .populate('user', 'name email')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Order.countDocuments(query);

    res.json({
      orders,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update order status and tracking
router.put('/orders/:id', auth, adminAuth, async (req, res) => {
  try {
    const { status, trackingNumber } = req.body;
    
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (status) order.status = status;
    if (trackingNumber) order.trackingNumber = trackingNumber;

    if (status === 'delivered') {
      order.isDelivered = true;
      order.deliveredAt = Date.now();
    }

    const updatedOrder = await order.save();
    await updatedOrder.populate('user', 'name email');

    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all products with pagination
router.get('/products', auth, adminAuth, async (req, res) => {
  try {
    const { page = 1, limit = 10, search } = req.query;
    const query = search ? {
      $or: [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } }
      ]
    } : {};

    const products = await Product.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Product.countDocuments(query);

    res.json({
      products,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add new product
router.post('/products', auth, adminAuth, async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      originalPrice,
      category,
      subcategory,
      images,
      sizes,
      colors,
      inventory,
      featured,
      tags,
      brand
    } = req.body;

    const product = new Product({
      name,
      description,
      price: Number(price),
      originalPrice: originalPrice ? Number(originalPrice) : undefined,
      category,
      subcategory,
      images: images || [],
      sizes: sizes || [],
      colors: colors || [],
      inventory: Number(inventory) || 0,
      featured: featured || false,
      tags: tags || [],
      brand
    });

    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update product
router.put('/products/:id', auth, adminAuth, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete product
router.delete('/products/:id', auth, adminAuth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if product has orders
    const ordersWithProduct = await Order.findOne({
      'orderItems.product': req.params.id
    });

    if (ordersWithProduct) {
      return res.status(400).json({ 
        message: 'Cannot delete product that has been ordered' 
      });
    }

    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all reviews
router.get('/reviews', auth, adminAuth, async (req, res) => {
  try {
    const { page = 1, limit = 10, approved } = req.query;
    const query = approved !== undefined ? { isApproved: approved === 'true' } : {};

    const reviews = await Review.find(query)
      .populate('user', 'name')
      .populate('product', 'name images')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Review.countDocuments(query);

    res.json({
      reviews,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Approve/Reject review
router.put('/reviews/:id/approve', auth, adminAuth, async (req, res) => {
  try {
    const { isApproved } = req.body;
    
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { isApproved },
      { new: true }
    ).populate('user', 'name').populate('product', 'name');

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    // Update product rating if review is approved
    if (isApproved) {
      await updateProductRating(review.product);
    }

    res.json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete review
router.delete('/reviews/:id', auth, adminAuth, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    await Review.findByIdAndDelete(req.params.id);
    
    // Update product rating
    await updateProductRating(review.product);

    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all users
router.get('/users', auth, adminAuth, async (req, res) => {
  try {
    const { page = 1, limit = 10, search } = req.query;
    const query = search ? {
      $or: [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ],
      role: 'user'
    } : { role: 'user' };

    const users = await User.find(query)
      .select('-password')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await User.countDocuments(query);

    res.json({
      users,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Helper function to update product rating
async function updateProductRating(productId) {
  const reviews = await Review.find({ 
    product: productId, 
    isApproved: true 
  });
  
  if (reviews.length > 0) {
    const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
    
    await Product.findByIdAndUpdate(productId, {
      rating: Math.round(averageRating * 10) / 10,
      numReviews: reviews.length
    });
  } else {
    await Product.findByIdAndUpdate(productId, {
      rating: 0,
      numReviews: 0
    });
  }
}

export default router;