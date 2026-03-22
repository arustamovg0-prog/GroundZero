import { Router } from 'express';
import { createLead, getLeads, createDownloadLead } from '../controllers/leadController.js';

const router = Router();

// POST /api/leads or /api/downloads
router.post('/', (req, res, next) => {
  if (req.originalUrl.includes('downloads')) {
    return createDownloadLead(req, res, next);
  }
  return createLead(req, res, next);
});
// GET /api/leads or /api/admin/leads
router.get('/', getLeads);
// POST /api/leads/downloads
router.post('/downloads', createDownloadLead);

export default router;
