import axios from 'axios';
import { API_BASE_URL } from '../config';

const api = axios.create({
  baseURL: API_BASE_URL,
});

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

export interface OrderItem {
  product: string;
  quantity: number;
  price: number;
  size: number;
  color: string;
}

export interface CreateOrderData {
  items: OrderItem[];
  total: number;
}

export interface RazorpayOrderResponse {
  orderId: string;
  amount: number;
  key: string;
}

export const createOrder = async (data: CreateOrderData): Promise<RazorpayOrderResponse> => {
  const response = await api.post('/orders', data);
  return response.data;
};

export const verifyPayment = async (payload: {
  orderId: string;
  paymentId: string;
  signature: string;
}): Promise<{ message: string }> => {
  const response = await api.post('/orders/verify', payload);
  return response.data;
};

export const getUserOrders = async () => {
  const response = await api.get('/orders');
  return response.data;
};