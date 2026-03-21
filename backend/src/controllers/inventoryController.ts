import { Request, Response, NextFunction } from 'express';
import prisma from '../database.js';

export const getInventoryStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { product } = req.query;

    if (!product) {
      return res.status(400).json({ error: 'Product ID is required' });
    }

    const inventory = await prisma.inventory.findFirst({
      where: {
        product: String(product),
      },
    });

    res.status(200).json({
      status: inventory?.status || 'AVAILABLE',
    });
  } catch (error) {
    next(error);
  }
};
