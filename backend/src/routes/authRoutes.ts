import { Router } from 'express';
import { googleAuthLogin, logout } from '@controllers/authController';

const router = Router();

router.post('/google/login', googleAuthLogin);
router.get('/logout', logout);

export default router;
