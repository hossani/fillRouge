import express from 'express';
import { sendMessage, getMessageHistory, getUserConversations,checkSeen, getUnreadMessages} from '../controllers/message'; // Adjust the path as needed
import authMiddleware from '../middlewares/middlewareAuth';
const router = express.Router();

router.get('/getUserConversations',authMiddleware, getUserConversations);
router.patch('/checkSeen/:id',authMiddleware, checkSeen);
router.get('/unread',authMiddleware, getUnreadMessages);

// Route to send a message
router.post('/',authMiddleware, sendMessage);

// Route to get message history with a specific user
router.get('/:otherUser',authMiddleware, getMessageHistory);

export default router;
