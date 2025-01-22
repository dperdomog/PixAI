import { Router } from 'express';
import { getTokenInfo } from '../controllers/bitqueryController';

const router = Router();

router.get('/token/:address', getTokenInfo);

export default router; 