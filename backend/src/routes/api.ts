import { Router } from 'express';
import { createLead, getLeads } from '../controllers/leadController.js';
import { createBooking, getBookings } from '../controllers/bookingController.js';

const router = Router();

// Маршруты для Лидов (Leads)
router.post('/leads', createLead);
router.get('/leads', getLeads);

// Маршруты для Бронирований (Bookings)
router.post('/bookings', createBooking);
router.get('/bookings', getBookings);

export default router;
