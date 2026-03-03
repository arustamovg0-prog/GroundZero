import express from "express";
import { createServer as createViteServer } from "vite";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import nodemailer from "nodemailer";
import { GoogleGenAI } from "@google/genai";

const prisma = new PrismaClient();
const app = express();
const PORT = 3000;

app.use(express.json());

// 1) B2B Forms
const leadSchema = z.object({
  name: z.string().min(2, "Имя обязательно"),
  email: z.string().email("Неверный email").optional().or(z.literal("")),
  phone: z.string().min(9, "Телефон обязателен"),
  company: z.string().optional(),
  teamSize: z.number().optional(),
  term: z.number().optional(),
  segment: z.string().optional(),
  utm: z.string().optional(),
});

app.post("/api/leads", async (req, res) => {
  try {
    const data = leadSchema.parse(req.body);
    const isPriority = data.term && data.term >= 24;
    const status = isPriority ? "PRIORITY_CLIENT" : "NEW";

    const lead = await prisma.lead.create({
      data: {
        ...data,
        priority: isPriority || false,
        status,
      },
    });

    await prisma.leadEvent.create({
      data: {
        leadId: lead.id,
        type: "FORM_SUBMIT",
        details: `Form submitted. Priority: ${isPriority}`,
      },
    });

    res.json({ success: true, leadId: lead.id, isPriority });
  } catch (error: any) {
    if (error && error.name === "ZodError") {
      res.status(400).json({ success: false, errors: error.errors });
    } else {
      console.error("Lead creation error:", error);
      res.status(500).json({ success: false, message: "Внутренняя ошибка сервера" });
    }
  }
});

// 2) Lead Magnet
app.post("/api/downloads", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email || !email.includes("@")) {
      return res.status(400).json({ success: false, message: "Неверный email" });
    }

    // Try to find existing lead
    const existingLead = await prisma.lead.findFirst({ where: { email } });

    const download = await prisma.download.create({
      data: {
        email,
        pdfName: "Как снизить офисные расходы",
        leadId: existingLead?.id,
      },
    });

    // Simulate sending email (Nodemailer)
    // In production, configure actual SMTP
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: { user: "test", pass: "test" },
    });
    
    // We just log it for now to avoid crashing if SMTP is invalid
    console.log(`Sending PDF to ${email}...`);

    res.json({ success: true, downloadId: download.id });
  } catch (error) {
    console.error("Download error:", error);
    res.status(500).json({ success: false, message: "Ошибка при отправке материала" });
  }
});

// 3) Event Calculator
app.post("/api/events/calc", (req, res) => {
  try {
    const { guests, hours, isWeekend } = req.body;
    const baseRate = 500000; // 500k sum per hour
    let guestsFactor = 1;

    if (guests > 100) guestsFactor = 1.5;
    else if (guests > 50) guestsFactor = 1.2;

    const weekendMarkup = isWeekend ? 0.2 : 0; // 20% markup

    const rawPrice = hours * baseRate * guestsFactor;
    const finalPrice = rawPrice * (1 + weekendMarkup);

    res.json({ 
      success: true, 
      price: Math.round(finalPrice),
      isCorporate: guests > 100
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Ошибка расчета" });
  }
});

// 4) Inventory
app.get("/api/inventory", async (req, res) => {
  try {
    const { branch, product } = req.query;
    const inventory = await prisma.inventory.findFirst({
      where: { 
        branch: String(branch || "Kitob Olami"), 
        product: String(product || "team") 
      }
    });

    res.json({ 
      success: true, 
      status: inventory?.status || "AVAILABLE" 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Ошибка проверки мест" });
  }
});

// 5) AI Chat (Gemini)
app.post("/api/ai/chat", async (req, res) => {
  try {
    const { message, history } = req.body;
    
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ success: false, message: "Gemini API key not configured" });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    
    const systemInstruction = `
      Ты AI-ассистент коворкинга Ground Zero. 
      Твоя цель - квалифицировать лида, узнав размер его команды.
      Правила квалификации:
      - Команда <= 4 человек -> Предложи "Open Space"
      - Команда 5-19 человек -> Предложи "Team Office"
      - Команда 20+ человек -> Предложи "Corporate" и запроси email/телефон.
      
      Отвечай кратко, вежливо и по делу.
    `;

    const chat = ai.chats.create({
      model: "gemini-3-flash-preview",
      config: {
        systemInstruction,
      },
    });

    // Replay history (simplified for this example)
    // In a real app, you'd pass the history to the chat instance properly
    
    const response = await chat.sendMessage({ message });
    
    // Simple extraction logic for demo purposes
    let qualification = null;
    const text = response.text?.toLowerCase() || "";
    if (text.includes("open space")) qualification = "Open Space";
    else if (text.includes("team office")) qualification = "Team Office";
    else if (text.includes("corporate")) qualification = "Corporate";

    res.json({ 
      success: true, 
      reply: response.text,
      qualification
    });
  } catch (error) {
    console.error("AI Chat error:", error);
    res.status(500).json({ success: false, message: "Ошибка AI сервиса" });
  }
});

// 6) Admin Leads
app.get("/api/admin/leads", async (req, res) => {
  try {
    const leads = await prisma.lead.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json({ success: true, leads });
  } catch (error) {
    res.status(500).json({ success: false, message: "Ошибка получения лидов" });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static("dist"));
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
