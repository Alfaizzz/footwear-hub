import { Router } from 'express';
import { getSettings, updateSettings } from '../controllers/settingController';
import { protect, admin } from '../middleware/auth';

const router = Router();

router.get('/', getSettings);
router.post('/', protect, admin, updateSettings);

export default router;