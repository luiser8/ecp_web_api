import express from 'express';
import { getAll, getById, post, put, del } from '../controllers/unitController.js';
import { auth } from '../middleware/auth.js';

const unitRouter = express.Router();
unitRouter.get('/', auth, getAll);
unitRouter.get('/:id', auth, getById);
unitRouter.post('/', auth, post);
unitRouter.put('/:id', auth, put);
unitRouter.delete('/:id', auth, del);

export default unitRouter;