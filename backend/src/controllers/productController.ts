import { Request, Response } from 'express';
import Product from '../models/Product';

export const getProducts = async (req: Request, res: Response) => {
  const products = await Product.find();
  res.json(products);
};

export const getProductById = async (req: Request, res: Response) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Not found' });
  res.json(product);
};

export const addProduct = async (req: Request, res: Response) => {
  try {
    const {
      name,
      price,
      description,
      brand,
      gender,
      category,
      imageUrl,
      stock
    } = req.body;

    const product = new Product({
      name,
      price,
      description,
      brand,
      gender,
      category,
      imageUrl,
      stock
    });

    await product.save();

    res.status(201).json({
      message: 'Product added successfully',
      product,
    });
  } catch (error) {
    res.status(400).json({
      message: 'Product creation failed',
      error,
    });
  }
};


export const updateProduct = async (req: Request, res: Response) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!product) return res.status(404).json({ message: 'Not found' });
  res.json(product);
};

export const deleteProduct = async (req: Request, res: Response) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
};