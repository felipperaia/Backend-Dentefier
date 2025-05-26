import { Router } from 'express';
import { createCaso, listCasos, updateCaso, deleteCaso, getCasoById } from '../controllers/casoController';
import { parseCookies, authenticateJWT, authorizeRoles } from '../middlewares/authMiddleware';

const router = Router();
router.use(parseCookies);

router.post('/', authenticateJWT, authorizeRoles('admin', 'perito'), createCaso);
router.get('/', authenticateJWT, authorizeRoles('admin', 'perito', 'assistente'), listCasos); 
router.get('/:id', authenticateJWT, authorizeRoles('admin', 'perito', 'assistente'), getCasoById);
router.put('/:id', authenticateJWT, authorizeRoles('admin', 'perito'), updateCaso);
router.delete('/:id', authenticateJWT, authorizeRoles('admin'), deleteCaso);

export default router;
