import axios from 'axios';
import { API_BASE_URL } from '../config';
import { Product } from '../mock/mockProducts';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Automatically add JWT token to every request if exists
api.interceptors.request.use((config) => {
  const authData = localStorage.getItem('footvibe_auth');
  if (authData) {
    const { token } = JSON.parse(authData);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export const getProducts = async (): Promise<Product[]> => {
  const response = await api.get('/products');
  return response.data;
};

export const getProductById = async (id: string): Promise<Product> => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

export const getFeaturedProducts = async (): Promise<Product[]> => {
  const response = await api.get('/products');
  const all = response.data;
  return all.filter((p: Product) => p.featured);
};

export const getNewArrivals = async (): Promise<Product[]> => {
  const response = await api.get('/products');
  const all = response.data;
  return all.filter((p: Product) => p.new);
};

export const addProduct = async (product: Omit<Product, 'id'>): Promise<Product> => {
  const response = await api.post('/products', product);
  return response.data;
};

export const updateProduct = async (id: string, updates: Partial<Product>): Promise<Product> => {
  const response = await api.put(`/products/${id}`, updates);
  return response.data;
};

export const deleteProduct = async (id: string): Promise<void> => {
  await api.delete(`/products/${id}`);
};