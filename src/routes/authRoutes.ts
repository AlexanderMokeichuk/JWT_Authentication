import { Router } from 'express';
import { login, refreshTokenController, register } from '../controllers';
import { VerifyRefreshToken } from '../middleware';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/refresh-token', VerifyRefreshToken, refreshTokenController);

export default router;
