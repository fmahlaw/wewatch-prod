import express from 'express';
import { getStore } from '../controllers/storeController.js';

const router = express.Router();

router.post('/', getStore);

export default router;