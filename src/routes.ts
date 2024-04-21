import { Router } from 'express'
import { UserControler } from './controler/UserControler';
import { AuthController } from './controler/AuthController';

const userControler = new UserControler();
const authController = new AuthController();

export const router = Router()


router.post('/create', userControler.store);
router.get('/users', userControler.index);
router.post('/auth', authController.authenticate);
