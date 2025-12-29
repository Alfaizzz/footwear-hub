import { Router } from "express";
import {
  getSettings,
  updateSettings,
} from "../controllers/settingController";
import { protect, admin } from "../middleware/auth";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Settings
 *   description: Application settings management APIs
 */

/**
 * @swagger
 * /api/settings:
 *   get:
 *     summary: Get application settings
 *     tags: [Settings]
 *     responses:
 *       200:
 *         description: Settings fetched successfully
 */
router.get("/", getSettings);

/**
 * @swagger
 * /api/settings:
 *   post:
 *     summary: Update application settings (Admin only)
 *     tags: [Settings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               siteName:
 *                 type: string
 *                 example: My E-Commerce App
 *               maintenanceMode:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       200:
 *         description: Settings updated successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin access required
 */
router.post("/", protect, admin, updateSettings);

export default router;
