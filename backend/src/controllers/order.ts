import { Request, Response, NextFunction } from 'express';
import { faker } from '@faker-js/faker';
import Product from '../models/product';
import BadRequestError from '../errors/bad-request';

const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {
      payment,
      email,
      phone,
      address,
      total,
      items,
    } = req.body;

    if (!payment || !email || !phone || !address
        || total === undefined || !items || items.length === 0) {
      return next(new BadRequestError('Все поля обязательны'));
    }

    if (payment !== 'card' && payment !== 'online') {
      return next(new BadRequestError('Payment должен быть card или online'));
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return next(new BadRequestError('Некорректный email'));
    }

    const products = await Product.find({ _id: { $in: items } });

    if (products.length !== items.length) {
      return next(new BadRequestError('Некоторые товары не найдены'));
    }

    let calculatedTotal = 0;
    // eslint-disable-next-line no-restricted-syntax
    for (const product of products) {
      if (product.price === null) {
        return next(new BadRequestError(`Товар "${product.title}" не продается`));
      }
      calculatedTotal += product.price;
    }

    if (calculatedTotal !== total) {
      return next(new BadRequestError('Общая сумма не совпадает'));
    }

    const orderId = faker.string.uuid();

    return res.status(201).json({
      id: orderId,
      total,
    });
  } catch (err) {
    return next(err);
  }
};

export default createOrder;
