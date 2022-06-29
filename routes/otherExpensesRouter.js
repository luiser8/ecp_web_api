import express from 'express';
import { getAll, getById, post, put, del } from '../controllers/otherExpensesController.js';
import { auth } from '../middleware/auth.js';

const otherExpensesRouter = express.Router();
otherExpensesRouter.get('/', auth, getAll);
otherExpensesRouter.get('/:id', auth, getById);
otherExpensesRouter.post('/', auth, post);
otherExpensesRouter.put('/:id', auth, put);
otherExpensesRouter.delete('/:id', auth, del);

export default otherExpensesRouter;