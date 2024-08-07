import dotenv from 'dotenv';
dotenv.config();

import connect from './connectDB.js';
connect();

import express from 'express';
import cors from 'cors';
const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());

import productRoutes from './routes/productRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import productTypeRoutes from './routes/productTypeRoutes.js';
app.use('/api/product', productRoutes);
app.use('/api/product-type', productTypeRoutes);
app.use('/api/category', categoryRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is listening on PORT: ${PORT}!`);
});