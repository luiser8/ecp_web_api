import express from 'express';
import { getSimpleAll, getProductExists, getAll, getById, post, put, del } from '../controllers/productController.js';
import { auth } from '../middleware/auth.js';

const productRouter = express.Router();
productRouter.get('/', auth, getSimpleAll);
productRouter.get('/check/type/:type/value/:value', auth, getProductExists);
productRouter.get('/all', auth, getAll);
productRouter.get('/:id', auth, getById);
productRouter.post('/', auth, post);
productRouter.put('/:id', auth, put);
productRouter.delete('/:id', auth, del);

export default productRouter;