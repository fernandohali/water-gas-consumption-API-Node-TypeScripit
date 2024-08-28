import { Router } from 'express';
import { getReading } from '../controllers';

const router = Router();

router.post('/get-reading', getReading);

export default router;
