import express from 'express';
import { getAll, getById, post, put, del } from '../controllers/productController.js';
import { auth } from '../middleware/auth.js';

const productRouter = express.Router();
productRouter.get('/', auth, getAll);
productRouter.get('/:id', auth, getById);
productRouter.post('/', auth, post);
productRouter.put('/:id', auth, put);
productRouter.delete('/:id', auth, del);

export default productRouter;