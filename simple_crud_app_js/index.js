const express = require('express');
const mongoose = require('mongoose');

// Import models from the package
const { Product, Category } = require('packageforbackend'); // Import both Product and Category schemas
const app = express();

app.use(express.json());

// Basic Route
app.get('/', (req, res) => {
  res.send('Hello World uyiuiyu');
});

// Get all products
app.get('/api/products', async(req, res) => {
  try {
    // const product = await Product("testDM")
    // const products = await product.fin
     const products = await Product.find({});

    res.status(200).json({success: true, messgae: "Found", data: products});
  } catch (error) {
    res.status(500).json({ message: error.message });  // Send the error message instead of an undefined variable
  }
});

// Get a product by ID
app.get('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new product
app.post('/api/products', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Product deleted successfully", message: error.message });
  }
});

app.delete('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully", product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Additional route to get categories (for example)

app.post('/api/categories', async (req, res) => {
  try {
    const categ = await Category.create(req.body);
    res.status(200).json(categ);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/categories', async (req, res) => {
  try {
    const categories = await Category.find({});
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Connect to MongoDB and start the server
mongoose.connect('mongodb+srv://redwan229900:P46Y4zzOCyoZpBMG@backenddb.tbtrua0.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDB')
  .then(() => {
    console.log('Connected to Redwan database');
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch(() => {
    console.log("Connection Failed!!");
  });
