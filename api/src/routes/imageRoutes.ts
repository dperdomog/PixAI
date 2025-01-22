import { Router } from 'express';
import { analyzeImage, chat } from '../controllers/imageController';

const router = Router();

router.post('/analyze', analyzeImage);
router.post('/chat', chat);

export default router; 