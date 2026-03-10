import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('🔥 Ошибка сервера:', err.stack);

  // Обработка специфичных ошибок Prisma
  if (err.code === 'P2002') {
    return res.status(409).json({ error: 'Запись с такими данными уже существует.' });
  }

  // Стандартная ошибка сервера
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    error: err.message || 'Внутренняя ошибка сервера. Пожалуйста, попробуйте позже.'
  });
};
