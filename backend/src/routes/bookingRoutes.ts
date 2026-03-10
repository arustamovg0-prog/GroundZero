import { Router } from 'express';
import { createBooking, getBookings } from '../controllers/bookingController';

const router = Router();

// POST /api/bookings
router.post('/', createBooking);
// GET /api/bookings (дополнительно для админки)
router.get('/', getBookings);

export default router;
