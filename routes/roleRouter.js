import express from 'express';
import { getAll, getById } from '../controllers/roleController.js';
import { auth } from '../middleware/auth.js';

const roleRouter = express.Router();
roleRouter.get('/', auth, getAll);
roleRouter.get('/:id', auth, getById);

export default roleRouter;