import { Router } from 'express';
import { sendToTelegram } from '../controllers/base.controller.js'

const router = new Router({ mergeParams: true });

router.post('/bot', sendToTelegram)

export default router;
