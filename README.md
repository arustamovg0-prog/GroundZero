# Ground Zero B2B Platform

A production-ready B2B platform for Ground Zero coworking network.

## Tech Stack
- Frontend: React + Vite + TypeScript + Tailwind CSS + Framer Motion
- Backend: Express + Prisma + PostgreSQL (configured for SQLite in demo)
- AI: Google Gemini API (Server-side proxy)
- Validation: Zod
- Email: Nodemailer

## Features
1. **B2B Forms**: Smart forms with server-side validation and priority client tagging.
2. **Lead Magnet**: Email capture with PDF delivery simulation.
3. **Event Calculator**: Dynamic pricing calculation on the server.
4. **Inventory System**: Real-time availability checks from the database.
5. **AI Chat**: Gemini-powered lead qualification bot.

## Local Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Variables**
   Copy `.env.example` to `.env` and fill in your keys:
   ```bash
   cp .env.example .env
   ```
   *Note: For the demo, SQLite is used instead of PostgreSQL. To use PostgreSQL, update `prisma/schema.prisma` provider to `postgresql`.*

3. **Database Migration & Seeding**
   ```bash
   npx prisma db push
   npm run seed
   ```

4. **Run Development Server**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:3000`.

## Production Build

```bash
npm run build
npm start
```

## QA Checklist
- [x] **Brand Colors**: Dark Blue `#211964`, Yellow `#ffd714` applied globally.
- [x] **Typography**: Roboto font enforced.
- [x] **B2B Form**: Validates inputs, submits to `/api/leads`, handles >= 24 months logic.
- [x] **Lead Magnet**: Validates email, submits to `/api/downloads`, handles errors gracefully.
- [x] **Event Calculator**: Calls `/api/events/calc`, displays accurate pricing.
- [x] **Inventory**: Checks `/api/inventory`, disables booking if `FULL`.
- [x] **AI Chat**: Calls `/api/ai/chat`, qualifies leads based on team size.
- [x] **Security**: Gemini API key is securely stored on the backend.
