import { Schema, model, Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  stock: number;
  imageUrl: string;
  category: 'sneakers' | 'boots' | 'sandals' | 'formal' | 'sports';
  gender: 'men' | 'women' | 'kids' | 'unisex';
  brand: string;
  rating: number;
  reviews: number;
  sizes: number[];
  colors: string[];
  featured?: boolean;
  new?: boolean;
}

const productSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  stock: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  category: { type: String, required: true },
  gender: { type: String, required: true },
  brand: { type: String, required: true },
  rating: { type: Number, default: 4.5 },
  reviews: { type: Number, default: 0 },
  sizes: { type: [Number], required: true },
  colors: { type: [String], required: true },
  featured: { type: Boolean, default: false },
  new: { type: Boolean, default: false },
}, { timestamps: true });

export default model<IProduct>('Product', productSchema);