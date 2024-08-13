import { Router } from 'express';
import kuesionerUmkmController from '../controllers/kuesionerUmkmController';
import authMiddleware from '../middleware/authMiddleware';

const router = Router();

router.post('/', authMiddleware, kuesionerUmkmController.create);
router.get('/', authMiddleware, kuesionerUmkmController.getAll);
router.get('/:id', authMiddleware, kuesionerUmkmController.getById);
router.put('/:id', authMiddleware, kuesionerUmkmController.update);
router.delete('/:id', authMiddleware, kuesionerUmkmController.remove);

export default router;
