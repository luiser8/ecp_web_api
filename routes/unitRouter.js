import express from 'express';
import { getAll, getById, post, put, del, getSimpleAll } from '../controllers/unitController.js';
import { auth } from '../middleware/auth.js';

const unitRouter = express.Router();
unitRouter.get('/', auth, getSimpleAll);
unitRouter.get('/all', auth, getAll);
unitRouter.get('/:id', auth, getById);
unitRouter.post('/', auth, post);
unitRouter.put('/:id', auth, put);
unitRouter.delete('/:id', auth, del);

export default unitRouter;