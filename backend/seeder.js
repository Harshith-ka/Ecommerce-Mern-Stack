import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Product from './models/Product.js';
import Order from './models/Order.js';

dotenv.config();

const sampleProducts = [
  {
    name: "Classic White T-Shirt",
    description: "Premium quality cotton t-shirt for everyday wear. Comfortable and durable.",
    price: 29.99,
    originalPrice: 39.99,
    category: "Men",
    images: [
      {
        url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
        alt: "Classic White T-Shirt"
      }
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "White", code: "#FFFFFF" },
      { name: "Black", code: "#000000" },
      { name: "Navy", code: "#000080" }
    ],
    inventory: 50,
    featured: true,
    brand: "FashionCo"
  },
  {
    name: "Summer Floral Dress",
    description: "Beautiful floral pattern dress perfect for summer occasions. Light and comfortable.",
    price: 59.99,
    originalPrice: 79.99,
    category: "Women",
    images: [
      {
        url: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500",
        alt: "Summer Floral Dress"
      }
    ],
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Floral Pink", code: "#FFB6C1" },
      { name: "Floral Blue", code: "#ADD8E6" }
    ],
    inventory: 30,
    featured: true,
    brand: "SummerStyle"
  },
  {
    name: "Designer Leather Handbag",
    description: "Luxurious leather handbag with multiple compartments. Perfect for work and casual outings.",
    price: 129.99,
    category: "Accessories",
    images: [
      {
        url: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500",
        alt: "Designer Leather Handbag"
      }
    ],
    sizes: ["One Size"],
    colors: [
      { name: "Brown", code: "#8B4513" },
      { name: "Black", code: "#000000" }
    ],
    inventory: 20,
    featured: true,
    brand: "LuxuryBags"
  },
  {
    name: "Sports Running Shoes",
    description: "High-performance running shoes with cushion technology for maximum comfort.",
    price: 89.99,
    originalPrice: 119.99,
    category: "Shoes",
    images: [
      {
        url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
        alt: "Sports Running Shoes"
      }
    ],
    sizes: ["7", "8", "9", "10", "11", "12"],
    colors: [
      { name: "Black/Red", code: "#000000" },
      { name: "Blue/White", code: "#0000FF" },
      { name: "Gray/Orange", code: "#808080" }
    ],
    inventory: 40,
    featured: false,
    brand: "RunPro"
  },
  {
    name: "Casual Denim Jacket",
    description: "Classic denim jacket for a stylish casual look. Durable and versatile.",
    price: 79.99,
    category: "Men",
    images: [
      {
        url: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500",
        alt: "Casual Denim Jacket"
      }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Light Blue", code: "#87CEEB" },
      { name: "Dark Blue", code: "#00008B" }
    ],
    inventory: 25,
    featured: true,
    brand: "DenimWorks"
  },
  {
    name: "Elegant Pearl Necklace",
    description: "Beautiful pearl necklace that adds elegance to any outfit. Perfect for special occasions.",
    price: 49.99,
    originalPrice: 69.99,
    category: "Accessories",
    images: [
      {
        url: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500",
        alt: "Elegant Pearl Necklace"
      }
    ],
    sizes: ["One Size"],
    colors: [
      { name: "White Pearl", code: "#F5F5F5" },
      { name: "Black Pearl", code: "#2F2F2F" }
    ],
    inventory: 15,
    featured: false,
    brand: "PearlElegance"
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce');

    // Clear existing data
    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();

    console.log('Data destroyed...');

    // Create admin user
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: '123456',
      role: 'admin'
    });

    // Create regular user
    const testUser = await User.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: '123456'
    });

    // Create sample products
    const createdProducts = await Product.insertMany(sampleProducts);

    console.log('Data imported...');
    console.log(`Admin User: ${adminUser.email} / 123456`);
    console.log(`Test User: ${testUser.email} / 123456`);
    
    process.exit();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce');

    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();

    console.log('Data destroyed...');
    process.exit();
  } catch (error) {
    console.error('Error destroying data:', error);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  seedDatabase();
}