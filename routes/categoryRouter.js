import express from 'express';
import { getAll, getById, post, put, del } from '../controllers/categoryController.js';
import { auth } from '../middleware/auth.js';

const categoryRouter = express.Router();
categoryRouter.get('/', auth, getAll);
categoryRouter.get('/:id', auth, getById);
categoryRouter.post('/', auth, post);
categoryRouter.put('/:id', auth, put);
categoryRouter.delete('/:id', auth, del);

export default categoryRouter;