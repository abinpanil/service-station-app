import express from 'express';
import { authUser, loggedIn, logoutUser, registerUser } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', authUser);
router.post('/register', registerUser)
router.post('/logout', logoutUser);
router.get('/loggedIn', protect,loggedIn);

export default router;