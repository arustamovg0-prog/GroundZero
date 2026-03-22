import { Request, Response, NextFunction } from 'express';
import prisma from '../database.js';

export const getLocations = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const locations = await prisma.location.findMany();
    
    // В реальной системе здесь был бы сложный расчет заполняемости.
    // Для примера добавим статические данные или рассчитаем на основе инвентаря.
    const locationsWithOccupancy = await Promise.all(locations.map(async (loc) => {
      // Ищем инвентарь для этой локации
    const inventory = await prisma.inventory.findMany({
        where: { locationId: loc.id }
      });
      
      const fullCount = inventory.filter(i => i.status === 'FULL').length;
      const totalCount = inventory.length || 1;
      const occupancy = Math.round((fullCount / totalCount) * 100);
      
      // Маппинг ID для фронтенда (kitob-olami, minor, sharq)
      const slug = loc.name.toLowerCase().replace(' ', '-');

      return {
        id: slug,
        dbId: loc.id,
        name: loc.name,
        address: loc.address,
        occupancy: occupancy > 0 ? occupancy : 65, // Дефолтное значение если нет данных
        status: occupancy > 90 ? "High Occupancy" : "Normal"
      };
    }));

    res.status(200).json(locationsWithOccupancy);
  } catch (error) {
    next(error);
  }
};
