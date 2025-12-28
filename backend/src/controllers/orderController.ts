import { Request, Response } from 'express';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import Order from '../models/Order';
import { AuthRequest } from '../middleware/auth';  // Import if needed
import mongoose from 'mongoose';

const rzp = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID as string,
  key_secret: process.env.RAZORPAY_KEY_SECRET as string,
});

export const createOrder = async (req: AuthRequest, res: Response) => {
  const { items, total } = req.body;
  const order = new Order({ user: req.user?.id, items, total });
  await order.save();

  const rzpOrder = await rzp.orders.create({
    amount: total * 100,  // in paise
    currency: 'INR',
    receipt: order._id.toString(),
  });

  res.json({ orderId: rzpOrder.id, amount: total * 100, key: process.env.RAZORPAY_KEY_ID });
};

export const verifyPayment = async (req: Request, res: Response) => {
  const { orderId, paymentId, signature } = req.body;
  const body = orderId + '|' + paymentId;
  const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET as string).update(body).digest('hex');

  if (expectedSignature !== signature) return res.status(400).json({ message: 'Invalid signature' });

  await Order.findOneAndUpdate({ _id: orderId.split('_')[1] }, { status: 'paid', paymentId });
  res.json({ message: 'Payment verified' });
};

export const getUserOrders = async (req: AuthRequest, res: Response) => {
  if (!req.user?.id) {
    return res.status(401).json({ message: 'Unauthorized: No user found' });
  }

  try {
    const orders = await Order.find({
  User: new mongoose.Types.ObjectId(req.user.id),
})
  .populate('items.product')
  .sort({ createdAt: -1 });


    res.json(orders);
  } catch (error) {
    console.error('Error fetching user orders:', error);
    res.status(500).json({ message: 'Server error' });
  }
};