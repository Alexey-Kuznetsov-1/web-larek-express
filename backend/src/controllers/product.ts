import { Request, Response, NextFunction } from 'express';
import Product from '../models/product';
import BadRequestError from '../errors/bad-request';
import ConflictError from '../errors/conflict';

export const getProducts = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const products = await Product.find();
    return res.json({
      items: products,
      total: products.length,
    });
  } catch (err) {
    return next(err);
  }
};

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {
      title,
      image,
      category,
      description,
      price,
    } = req.body;

    if (!title || !image || !category) {
      return next(new BadRequestError('Не все обязательные поля заполнены'));
    }

    const product = await Product.create({
      title,
      image,
      category,
      description,
      price,
    });

    return res.status(201).json(product);
  } catch (err) {
    if (err instanceof Error && err.message.includes('E11000')) {
      return next(new ConflictError('Товар с таким названием уже существует'));
    }
    return next(err);
  }
};
