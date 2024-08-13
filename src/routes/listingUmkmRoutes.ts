import { Router } from 'express';
import listingUmkmController from '../controllers/listingUmkmController';
import authMiddleware from '../middleware/authMiddleware';

const router = Router();

router.post('/', authMiddleware, listingUmkmController.create);
router.get('/', authMiddleware, listingUmkmController.getAll);
router.get('/umkm', authMiddleware, listingUmkmController.getUmkmListings);
router.get('/:id', authMiddleware, listingUmkmController.getById);
router.put('/:id', authMiddleware, listingUmkmController.update);
router.delete('/:id', authMiddleware, listingUmkmController.remove);

export default router;
