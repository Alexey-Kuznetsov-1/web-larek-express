import { Request, Response, NextFunction } from 'express';
import { CelebrateError } from 'celebrate';

interface CustomError extends Error {
  statusCode?: number;
  code?: number;
}

const errorHandler = (
  err: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err instanceof CelebrateError) {
    const errorMessage = err.message || 'Ошибка валидации данных';
    return res.status(400).json({
      message: errorMessage,
    });
  }

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Ошибка на сервере';

  return res.status(statusCode).json({
    message,
  });
};

export default errorHandler;
