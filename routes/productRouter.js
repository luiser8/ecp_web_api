import express from 'express';
import { getSimpleAll, getCodeExists, getAll, getById, post, put, del } from '../controllers/productController.js';
import { auth } from '../middleware/auth.js';

const productRouter = express.Router();
productRouter.get('/', auth, getSimpleAll);
productRouter.get('/:code', auth, getCodeExists);
productRouter.get('/all', auth, getAll);
productRouter.get('/:id', auth, getById);
productRouter.post('/', auth, post);
productRouter.put('/:id', auth, put);
productRouter.delete('/:id', auth, del);

export default productRouter;