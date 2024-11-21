import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import cookieParser from 'cookie-parser';

const app = express();
const localhost = `http://localhost:${process.env.PORT || 8000}`;

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
    optionsSuccessStatus: 200,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);

const run = async () => {
  app.listen(process.env.PORT || 8000, () => {
    console.log(`Server running at ${localhost}`);
  });
};

void run();
