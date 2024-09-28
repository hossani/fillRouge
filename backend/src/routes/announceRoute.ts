import express from 'express';
import { createAnnounce, getFilteredEvents, getAnnounceById } from '../controllers/announce'; // Adjust the path as needed
import authMiddleware from '../middlewares/middlewareAuth';
import limiter from '../middlewares/rateLimit'
const router = express.Router();

router.post('/',authMiddleware,limiter.limiterEvents, createAnnounce);
router.get('/filteredEvents', getFilteredEvents);
router.get('/:eventID', getAnnounceById);


export default router;
