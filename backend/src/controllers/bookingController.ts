import { Request, Response, NextFunction } from 'express';
import prisma from '../database.js';

export const createBooking = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { clientName, clientPhone, locationId, roomType, date, durationHours, guestsCount } = req.body;

    if (!clientName || !clientPhone || !locationId || !roomType || !date) {
      return res.status(400).json({ error: 'Заполните все обязательные поля для бронирования.' });
    }

    // Проверяем, существует ли указанная локация (Kitob Olami, Minor, Sharq)
    const locationExists = await prisma.location.findUnique({ where: { id: parseInt(locationId) } });
    if (!locationExists) {
      return res.status(404).json({ error: 'Выбранный филиал не найден.' });
    }

    const newBooking = await prisma.booking.create({
      data: {
        clientName,
        clientPhone,
        locationId: parseInt(locationId),
        roomType,
        date: new Date(date),
        durationHours: parseInt(durationHours),
        guestsCount: parseInt(guestsCount)
      }
    });

    res.status(201).json({
      success: true,
      message: 'Помещение успешно забронировано!',
      data: newBooking
    });
  } catch (error) {
    next(error);
  }
};

export const getBookings = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bookings = await prisma.booking.findMany({
      include: { location: true },
      orderBy: { date: 'asc' },
    });
    res.status(200).json({ success: true, data: bookings });
  } catch (error) {
    next(error);
  }
};
