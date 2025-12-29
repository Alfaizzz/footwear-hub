import { Router } from "express";
import {
  createOrder,
  verifyPayment,
  getUserOrders,
} from "../controllers/orderController";
import { protect } from "../middleware/auth";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order and payment related APIs
 */

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *             properties:
 *               amount:
 *                 type: number
 *                 example: 500
 *               currency:
 *                 type: string
 *                 example: INR
 *     responses:
 *       201:
 *         description: Order created successfully
 *       401:
 *         description: Unauthorized
 */
router.post("/", protect, createOrder);

/**
 * @swagger
 * /api/orders/verify:
 *   post:
 *     summary: Verify Razorpay payment
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - razorpay_order_id
 *               - razorpay_payment_id
 *               - razorpay_signature
 *             properties:
 *               razorpay_order_id:
 *                 type: string
 *                 example: order_Lx123456789
 *               razorpay_payment_id:
 *                 type: string
 *                 example: pay_Lx987654321
 *               razorpay_signature:
 *                 type: string
 *                 example: 5f3c2e1a...
 *     responses:
 *       200:
 *         description: Payment verified successfully
 *       400:
 *         description: Payment verification failed
 *       401:
 *         description: Unauthorized
 */
router.post("/verify", protect, verifyPayment);

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Get orders of logged-in user
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User orders fetched successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/", protect, getUserOrders);

export default router;
