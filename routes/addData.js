import express from 'express';
import { getAdditionalData } from '../controllers/additionalData.js';


const router = express.Router();

router.post('/', getAdditionalData);

export default router;