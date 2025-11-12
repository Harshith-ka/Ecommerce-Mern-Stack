import express from 'express';
import User from '../models/User.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Get user profile
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update user profile
router.put('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.avatar = req.body.avatar || user.avatar;

      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        avatar: updatedUser.avatar,
        role: updatedUser.role,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Add/Update user address
router.put('/address', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (user) {
      const address = {
        name: req.body.name,
        street: req.body.street,
        city: req.body.city,
        state: req.body.state,
        zipCode: req.body.zipCode,
        country: req.body.country,
        phone: req.body.phone,
      };

      if (req.body.addressId) {
        // Update existing address
        const addressIndex = user.addresses.findIndex(
          addr => addr._id.toString() === req.body.addressId
        );
        if (addressIndex > -1) {
          user.addresses[addressIndex] = address;
        }
      } else {
        // Add new address
        user.addresses.push(address);
      }

      const updatedUser = await user.save();
      res.json(updatedUser.addresses);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Manage wishlist
router.post('/wishlist/:productId', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const productId = req.params.productId;

    const isInWishlist = user.wishlist.includes(productId);

    if (isInWishlist) {
      // Remove from wishlist
      user.wishlist = user.wishlist.filter(id => id.toString() !== productId);
      await user.save();
      res.json({ 
        message: 'Removed from wishlist', 
        wishlist: user.wishlist,
        action: 'removed'
      });
    } else {
      // Add to wishlist
      user.wishlist.push(productId);
      await user.save();
      res.json({ 
        message: 'Added to wishlist', 
        wishlist: user.wishlist,
        action: 'added'
      });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get wishlist with populated products
router.get('/wishlist', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate({
      path: 'wishlist',
      select: 'name price images description inventory rating numReviews category'
    });
    
    res.json(user.wishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user statistics
router.get('/stats', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    // Get order count (you would need to import Order model)
    // const orderCount = await Order.countDocuments({ user: req.user.id });
    
    // Get wishlist count
    const wishlistCount = user.wishlist.length;
    
    // Get review count (you would need to import Review model)
    // const reviewCount = await Review.countDocuments({ user: req.user.id });

    res.json({
      // totalOrders: orderCount,
      totalOrders: 12, // Mock data for now
      wishlistItems: wishlistCount,
      // totalReviews: reviewCount
      totalReviews: 5 // Mock data for now
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;