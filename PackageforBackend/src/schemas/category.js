const mongoose = require('mongoose');
const { getCachedModel, initializedDatabases } = require('../utils/cacheModel');

// Define the Category schema
const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter the category name"],
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Database initialization and caching logic
const Category = async (dbName) => {
  const model = await getCachedModel(dbName, 'Category', CategorySchema);
  
  // Only initialize the database once
  if (!initializedDatabases.has(dbName)) {
    const connection = mongoose.connection.useDb(dbName);
    await connection.model('Category', CategorySchema).init();  // Synchronize indexes
    initializedDatabases.add(dbName);
  }

  return model;
};

module.exports = Category;