// src/routes/evidenciaRoutes.ts
import { Router } from 'express';
import multer from 'multer';
import {
  createEvidencia,
  listEvidenciasByCaso,
  getEvidenciaById,
  updateEvidencia,
  deleteEvidencia,
  downloadEvidenciaFile
} from '../controllers/evidenciaController';
import { authenticateJWT, authorizeRoles } from '../middlewares/authMiddleware';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post(
  '/',
  authenticateJWT,
  authorizeRoles('admin', 'assistente'),
  upload.single('arquivo'),
  createEvidencia
);

router.get(
  '/:id/arquivo',
  authenticateJWT,
  authorizeRoles('admin', 'perito', 'assistente'),
  downloadEvidenciaFile
);

router.get(
  '/caso/:casoId',
  authenticateJWT,
  authorizeRoles('admin', 'perito', 'assistente'),
  listEvidenciasByCaso
);

router.get(
  '/:id',
  authenticateJWT,
  authorizeRoles('admin', 'perito', 'assistente'),
  getEvidenciaById
);

router.put(
  '/:id',
  authenticateJWT,
  authorizeRoles('admin'),
  upload.single('arquivo'),
  updateEvidencia
);

router.delete(
  '/:id',
  authenticateJWT,
  authorizeRoles('admin'),
  deleteEvidencia
);

export default router;