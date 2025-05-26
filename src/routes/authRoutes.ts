import { Router } from 'express';
import { login, register, getCurrentUser, logout } from '../controllers/authController';
import { authenticateJWT } from '../middlewares/authMiddleware';

const router = Router();

// Autenticação
router.post('/login', login);
router.post('/register', register);
router.post('/logout', authenticateJWT, logout);

// Rota para obter dados do usuário autenticado
router.get('/me', authenticateJWT, getCurrentUser);

export default router;