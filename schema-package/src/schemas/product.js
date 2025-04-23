const mongoose = require('mongoose');
const { getCachedModel, initializedDatabases } = require('../utils/cacheModel');

// Define the Product schema
const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter the product name"],
    },
    quantity: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    image: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

// Database initialization and caching logic
const Product = async (dbName) => {
  const model = await getCachedModel(dbName, 'Product', ProductSchema);
  
  // Only initialize the database once
  if (!initializedDatabases.has(dbName)) {
    const connection = mongoose.connection.useDb(dbName);
    await connection.model('Product', ProductSchema).init();  // Synchronize indexes
    initializedDatabases.add(dbName);
  }

  return model;
};

module.exports = Product;