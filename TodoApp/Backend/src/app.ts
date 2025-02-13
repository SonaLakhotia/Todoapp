import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
const dconfig = dotenv.config();

import taskRoutes from './routes/taskRoutes';
import { connectDB } from './config/db';

const port = process.env.PORT || 5000;

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use("/tasks", taskRoutes);

export default app;
