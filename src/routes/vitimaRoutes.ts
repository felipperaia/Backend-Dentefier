// src/routes/vitimaRoutes.ts
import { Router } from 'express';
import {
  createVitima,
  listVitimas,
  getVitimaById,
  updateVitima,
  deleteVitima
} from '../controllers/vitimaController';

const router = Router();
router.post('/', createVitima);
router.get('/', listVitimas);
router.get('/:id', getVitimaById);
router.put('/:id', updateVitima);
router.delete('/:id', deleteVitima);
export default router;