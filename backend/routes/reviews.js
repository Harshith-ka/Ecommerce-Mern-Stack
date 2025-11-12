import express from 'express';
import Review from '../models/Review.js';
import Product from '../models/Product.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Create review
router.post('/', auth, async (req, res) => {
  try {
    const { product, rating, comment, images } = req.body;

    // Check if user already reviewed this product
    const alreadyReviewed = await Review.findOne({
      user: req.user.id,
      product,
    });

    if (alreadyReviewed) {
      return res.status(400).json({ message: 'Product already reviewed' });
    }

    // Check if user has purchased the product (you might want to add this validation)
    // const hasPurchased = await Order.findOne({
    //   user: req.user.id,
    //   'orderItems.product': product,
    //   isPaid: true
    // });

    // if (!hasPurchased) {
    //   return res.status(400).json({ message: 'You must purchase the product before reviewing' });
    // }

    const review = new Review({
      user: req.user.id,
      product,
      rating: Number(rating),
      comment,
      images,
      isApproved: true, // Auto-approve for now, admin can moderate later
    });

    const createdReview = await review.save();
    await createdReview.populate('user', 'name');

    // Update product rating
    await updateProductRating(product);

    res.status(201).json(createdReview);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get reviews for a product
router.get('/product/:productId', async (req, res) => {
  try {
    const reviews = await Review.find({ 
      product: req.params.productId,
      isApproved: true 
    })
      .populate('user', 'name')
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user's reviews
router.get('/myreviews', auth, async (req, res) => {
  try {
    const reviews = await Review.find({ user: req.user.id })
      .populate('product', 'name images price')
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update review
router.put('/:id', auth, async (req, res) => {
  try {
    const { rating, comment, images } = req.body;
    
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    // Check if user owns the review
    if (review.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    review.rating = rating || review.rating;
    review.comment = comment || review.comment;
    review.images = images || review.images;

    const updatedReview = await review.save();
    await updatedReview.populate('user', 'name');

    // Update product rating
    await updateProductRating(review.product);

    res.json(updatedReview);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete review
router.delete('/:id', auth, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    // Check if user owns the review or is admin
    if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const productId = review.product;
    await Review.findByIdAndDelete(req.params.id);

    // Update product rating
    await updateProductRating(productId);

    res.json({ message: 'Review deleted successfully' });
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