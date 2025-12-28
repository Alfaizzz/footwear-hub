import { Router } from 'express';
import { createOrder, verifyPayment, getUserOrders } from '../controllers/orderController';
import { protect } from '../middleware/auth';

const router = Router();

router.post('/', protect, createOrder);
router.post('/verify', verifyPayment);  // Webhook or frontend callback
router.get('/', protect, getUserOrders);

export default router;