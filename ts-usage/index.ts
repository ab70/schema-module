import express from 'express';
import mongoose from 'mongoose';
import { Product, Category,  IProduct, ICategory} from 'packageforbackend';



// Type Definitions


const app = express();
app.use(express.json());

// Routes


// Product CRUD
app.get('/products', async (req, res) => {
  try {
    console.log("i");
    
    // const products = await Product.findOne();
    const product = await Product("multitn")
    const findProd = await product.find({})
    
    console.log("prod", findProd);
    
    res.json(findProd);
  } catch (error: any) {
    console.log(error);
    
    res.status(500).json({ error: error.message });
  }
});

app.post('/products', async (req, res) => {
  try {
    console.log("req", req.body);
    
    const product = await Product("multitn")
    const saveProd = await product.create(req.body);
    res.status(201).json(saveProd);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// MongoDB Connection
mongoose.connect('mongodb+srv://redwan229900:P46Y4zzOCyoZpBMG@backenddb.tbtrua0.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDB')
  .then(() => {
    console.log('MongoDB Connected');
    app.listen(3100, () => console.log('Server running on http://localhost:3100'));
  })
  .catch(err => console.error('Connection error:', err));