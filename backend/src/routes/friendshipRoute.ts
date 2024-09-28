import express from 'express';
import {deleteFriendship,  acceptFriendRequest, rejectFriendRequest,getFriends, sendFriendRequest, getFriendsPending, checkFriendStatus } from '../controllers/friendship'; // Adjust the path as needed
import authMiddleware from '../middlewares/middlewareAuth';
import limiter from '../middlewares/rateLimit';
const router = express.Router();

router.get('/myFriends',authMiddleware, getFriends);
router.get('/pendingRequest',authMiddleware, getFriendsPending);
router.get('/checkFriendStatus/:playerId',authMiddleware, checkFriendStatus);

// Route to send a friend request
router.post('/addFriend',authMiddleware,limiter.limiterFriend, sendFriendRequest);

// Route to accept a friend request
router.patch('/accept/:fromUserId',authMiddleware, acceptFriendRequest);

// Route to reject a friend request
router.delete('/reject/:fromUserId',authMiddleware, rejectFriendRequest);
router.delete('/deleteRelation/:friendId',authMiddleware, deleteFriendship);

export default router;
