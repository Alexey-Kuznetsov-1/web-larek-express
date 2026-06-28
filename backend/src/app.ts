import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import config from './config';
import productRoutes from './routes/product';
import orderRoutes from './routes/order';
import errorHandler from './middlewares/error-handler';
import NotFoundError from './errors/not-found';
import { requestLogger, errorLogger } from './middlewares/logger';

const app = express();
const PORT = config.port;

app.use(cors({
  origin: config.originAllow,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../public')));

app.use(requestLogger);

mongoose.connect(config.dbAddress)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

app.use('/product', productRoutes);
app.use('/order', orderRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Web-ларёк API работает!' });
});

app.use((req, res, next) => {
  next(new NotFoundError('Маршрут не найден'));
});

app.use(errorLogger);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});