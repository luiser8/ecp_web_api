import express from 'express';
import { getAll, getById, post, put, del, getExists, getByProd } from '../controllers/otherExpensesController.js';
import { auth } from '../middleware/auth.js';

const otherExpensesRouter = express.Router();
otherExpensesRouter.get('/', auth, getAll);
otherExpensesRouter.get('/:id', auth, getById);
otherExpensesRouter.get('/check/type/:type/value/:value', auth, getExists);
otherExpensesRouter.get('/products/:others', auth, getByProd);
otherExpensesRouter.post('/', auth, post);
otherExpensesRouter.put('/:id', auth, put);
otherExpensesRouter.delete('/:id', auth, del);

export default otherExpensesRouter;