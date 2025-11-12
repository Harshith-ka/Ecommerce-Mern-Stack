import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  originalPrice: {
    type: Number,
  },
  category: {
    type: String,
    required: true,
  },
  subcategory: {
    type: String,
  },
  images: [{
    url: String,
    alt: String,
  }],
  sizes: [{
    type: String,
  }],
  colors: [{
    name: String,
    code: String,
  }],
  inventory: {
    type: Number,
    required: true,
    default: 0,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  tags: [String],
  brand: {
    type: String,
  },
  rating: {
    type: Number,
    default: 0,
  },
  numReviews: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

export default mongoose.model('Product', productSchema);