import { Request, Response, NextFunction } from 'express';

export const calculateEventPrice = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { guests, hours, isWeekend } = req.body;

    if (!guests || !hours) {
      return res.status(400).json({ error: 'Guests and hours are required' });
    }

    // Базовая логика расчета
    let pricePerHour = 500000; // Базовая цена 500к в час

    if (guests > 50) pricePerHour = 800000;
    if (guests > 100) pricePerHour = 1200000;

    let totalPrice = pricePerHour * hours;

    if (isWeekend) {
      totalPrice *= 1.2; // +20% за выходные
    }

    res.status(200).json({
      price: totalPrice,
      isCorporate: guests > 100,
    });
  } catch (error) {
    next(error);
  }
};
