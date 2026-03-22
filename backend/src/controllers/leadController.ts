import { Request, Response, NextFunction } from 'express';
import prisma from '../database.js';

export const createLead = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, phone, email, company, interestIn, teamSize, term, utm, notes } = req.body;

    // Простая валидация на уровне контроллера
    if (!name || !phone || !interestIn) {
      return res.status(400).json({ error: 'Поля Имя, Телефон и Интересующий тариф обязательны.' });
    }

    // Сохранение в базу данных
    const newLead = await prisma.lead.create({
      data: {
        name,
        phone,
        email: email || null,
        company: company || null,
        interestIn,
        teamSize: teamSize ? Number(teamSize) : null,
        term: term ? Number(term) : null,
        utm: utm || null,
        notes: notes || null,
        status: 'NEW',
      },
    });

    res.status(201).json({
      success: true,
      message: 'Заявка успешно принята! Наш менеджер скоро свяжется с вами.',
      data: newLead
    });
  } catch (error) {
    next(error); // Передаем ошибку в глобальный обработчик
  }
};

export const getLeads = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const leads = await prisma.lead.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.status(200).json({ success: true, leads: leads });
  } catch (error) {
    next(error);
  }
};

export const createDownloadLead = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email обязателен.' });
    }

    const newLead = await prisma.lead.create({
      data: {
        name: 'Download Request',
        phone: 'N/A',
        email,
        interestIn: 'PDF Guide',
        status: 'NEW',
        notes: 'Requested PDF guide from LeadMagnet',
      },
    });

    res.status(201).json({
      success: true,
      message: 'PDF успешно отправлен на вашу почту!',
      data: newLead
    });
  } catch (error) {
    next(error);
  }
};
