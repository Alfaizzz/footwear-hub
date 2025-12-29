import { Request, Response } from "express";
import Razorpay from "razorpay";
import crypto from "crypto";
import Order from "../models/Order";
import { AuthRequest } from "../middleware/auth";
import mongoose from "mongoose";

/**
 * Create Razorpay instance safely
 */
const getRazorpayInstance = () => {
  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    throw new Error("Razorpay keys are missing");
  }

  return new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
};

/**
 * CREATE ORDER
 */
export const createOrder = async (req: AuthRequest, res: Response) => {
  try {
    const { items, total } = req.body;

    if (!items || !total) {
      return res.status(400).json({ message: "Items and total are required" });
    }

    const order = new Order({
      user: req.user?.id,
      items,
      total,
      status: "created",
    });

    await order.save();

    const razorpay = getRazorpayInstance();

    const rzpOrder = await razorpay.orders.create({
      amount: total * 100, // paise
      currency: "INR",
      receipt: order._id.toString(), // IMPORTANT
    });

    // Save razorpay order id in DB
    order.razorpayOrderId = rzpOrder.id;
    await order.save();

    res.json({
      orderId: rzpOrder.id,
      amount: total * 100,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error: any) {
    console.error("Create order error:", error);
    res.status(500).json({ message: error.message });
  }
};

/**
 * VERIFY PAYMENT
 */
export const verifyPayment = async (req: Request, res: Response) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET as string)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: "Invalid payment signature" });
    }

    const order = await Order.findOneAndUpdate(
      { razorpayOrderId: razorpay_order_id },
      {
        status: "paid",
        paymentId: razorpay_payment_id,
      },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({ message: "Payment verified successfully" });
  } catch (error: any) {
    console.error("Verify payment error:", error);
    res.status(500).json({ message: error.message });
  }
};

/**
 * GET USER ORDERS
 */
export const getUserOrders = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const orders = await Order.find({
      user: new mongoose.Types.ObjectId(req.user.id),
    })
      .populate("items.product")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    console.error("Fetch orders error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
