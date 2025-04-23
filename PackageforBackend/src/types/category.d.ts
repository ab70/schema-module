import { Document, Model } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CategoryModel extends Model<ICategory> {
  // Add any custom static methods here if needed
}

declare const Category: (dbName: string) => Promise<CategoryModel>;
export default Category;