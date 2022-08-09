import express from 'express';
import { getAll, getById, post, put, del, getSimpleAll } from '../controllers/supplierController.js';
import { auth } from '../middleware/auth.js';

const supplierRouter = express.Router();
supplierRouter.get('/', auth, getSimpleAll);
supplierRouter.get('/all', auth, getAll);
supplierRouter.get('/:id', auth, getById);
supplierRouter.post('/', auth, post);
supplierRouter.put('/:id', auth, put);
supplierRouter.delete('/:id', auth, del);

export default supplierRouter;