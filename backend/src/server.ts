import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Импорт маршрутов и middleware с расширением .js
import leadRoutes from "./routes/leadRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import { getInventoryStatus } from "./controllers/inventoryController.js";
import { getLocations } from "./controllers/locationController.js";
import { calculateEventPrice } from "./controllers/eventController.js";
import { chatWithAI } from "./controllers/aiController.js";
import { errorHandler } from "./middleware/errorHandler.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  // 1. Базовая защита и парсинг
  app.set('trust proxy', 1);
  app.use(helmet({
    contentSecurityPolicy: process.env.NODE_ENV === "production" ? undefined : false,
  }));
  app.use(cors({
    origin: process.env.FRONTEND_URL || '*',
    credentials: true
  }));
  app.use(express.json());

  // 2. Защита от спама (Rate Limiting)
  const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
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

  // Serve static files in production
  if (process.env.NODE_ENV === "production") {
    const distPath = path.join(__dirname, "../../dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  // 4. Глобальный перехватчик ошибок
  app.use(errorHandler);

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Бэкенд GroundZero успешно запущен на порту ${PORT}`);
  });
}

startServer().catch(console.error);
