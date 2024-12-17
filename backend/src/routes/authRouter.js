import express from 'express'
import { getCurrentUser, login, signup } from '../controllers/authController.js'
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/signup', signup)
router.post('/login', login)
router.get('/me',authenticateToken, getCurrentUser)

export default router