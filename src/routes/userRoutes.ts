import { Router } from 'express';
import userController from '../controllers/userController';

const router = Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/all', userController.getAllUsers); 

export default router;
