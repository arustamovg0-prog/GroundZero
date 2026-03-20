import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";

// Импорт маршрутов и middleware
import leadRoutes from "./backend/src/routes/leadRoutes";
import bookingRoutes from "./backend/src/routes/bookingRoutes";
import { getInventoryStatus } from "./backend/src/controllers/inventoryController";
import { getLocations } from "./backend/src/controllers/locationController";
import { calculateEventPrice } from "./backend/src/controllers/eventController";
import { chatWithAI } from "./backend/src/controllers/aiController";
import { errorHandler } from "./backend/src/middleware/errorHandler";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // 1. Базовая защита и парсинг
  app.set('trust proxy', 1);
  app.use(helmet({
    // Отключаем CSP для локальной разработки с Vite, иначе скрипты Vite будут заблокированы
    contentSecurityPolicy: process.env.NODE_ENV === "production" ? undefined : false,
  }));
  app.use(cors({
    origin: process.env.FRONTEND_URL || '*',
    credentials: true
  }));
  app.use(express.json());

  // 2. Защита от спама (Rate Limiting)
  const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 минут
    max: 100, // Увеличим до 100 для нормальной работы чата
    message: { error: 'Слишком много запросов. Пожалуйста, подождите немного.' }
  });

  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "GroundZero API is running" });
  });

  // 3. Подключение маршрутов (API Endpoints)
  app.use('/api/leads', apiLimiter, leadRoutes);
  app.use('/api/bookings', apiLimiter, bookingRoutes);
  app.get('/api/locations', apiLimiter, getLocations);
  app.get('/api/inventory', apiLimiter, getInventoryStatus);
  app.post('/api/events/calc', apiLimiter, calculateEventPrice);
  app.post('/api/ai/chat', apiLimiter, chatWithAI);

  // Vite middleware for development (serves the React frontend)
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // In production, serve static files from dist
    app.use(express.static("dist"));
    app.get("*", (req, res) => {
      res.sendFile("dist/index.html", { root: "." });
    });
  }

  // 4. Глобальный перехватчик ошибок (должен быть в самом конце)
  app.use(errorHandler);

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Бэкенд GroundZero успешно запущен на порту ${PORT}`);
  });
}

startServer().catch(console.error);
