import { Document, Model } from 'mongoose';

// Define the interface for a product
export interface IProduct extends Document {
  name: string;
  quantity: number;
  price: number;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Define the Product function that returns a Model instance for a specific database
export interface ProductModel extends Model<IProduct> {
  // Add any custom static methods here if needed
}

declare const Product: (dbName: string) => Promise<ProductModel>;
export default Product;