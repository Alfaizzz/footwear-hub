// backend/src/server.ts
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger'; // Make sure this file exists

import productRoutes from './routes/productRoutes';
import userRoutes from './routes/userRoutes';
import orderRoutes from './routes/orderRoutes';
import settingRoutes from './routes/settingRoutes';

dotenv.config(); // Loads .env file

const app = express();

app.use(cors({
  origin: 'http://localhost:5173', // Your Vite frontend port
  credentials: true,
}));
app.use(express.json());

// Swagger UI route - must be early
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// API routes
app.use('/api/products', productRoutes);
app.use('/api/auth', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/settings', settingRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('Backend is running! Visit /api-docs for Swagger');
});

// MongoDB connection with better error handling
if (!process.env.MONGO_URI) {
  console.error('ERROR: MONGO_URI not defined in .env file');
  process.exit(1);
}

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit if DB fails
  });

// Start server - THIS KEEPS THE PROCESS ALIVE
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Swagger UI: http://localhost:${PORT}/api-docs`);
});