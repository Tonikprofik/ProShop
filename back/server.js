import express from "express";
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from "./config/db.js";
import dotenv from "dotenv";

import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'

dotenv.config();

connectDB();

const app = express();

app.use(express.json())

app.get("/", (req, res) => {
  res.send("API is runnin");
});

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)

// custom error
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server runnin on ${process.env.NODE_ENV} mode on port ${PORT}`)
);
