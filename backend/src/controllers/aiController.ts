import { Request, Response, NextFunction } from 'express';
import { GoogleGenAI } from "@google/genai";

export const chatWithAI = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { message, history } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      return res.status(503).json({ error: 'AI Service not configured' });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    
    // В реальном приложении здесь была бы сложная логика с системным промптом
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: message,
      config: {
        systemInstruction: "Вы — ассистент коворкинга Ground Zero. Помогайте пользователям с выбором тарифа и бронированием. Будьте вежливы и профессиональны.",
      }
    });

    res.status(200).json({
      reply: response.text,
      qualification: message.toLowerCase().includes('команда') ? 'B2B' : 'Retail'
    });
  } catch (error) {
    next(error);
  }
};
