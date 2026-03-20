import { Router } from 'express';
import { createLead, getLeads } from '../controllers/leadController';

const router = Router();

// POST /api/leads
router.post('/', createLead);
// GET /api/leads (дополнительно для админки)
router.get('/', getLeads);

export default router;
