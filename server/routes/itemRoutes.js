import express from 'express';
import { addItem, deleteItem, getItem } from '../controllers/itemController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router
    .route('/')
    .post(protect, addItem)
    .get(protect, getItem)
    .delete(protect, deleteItem)

export default router;