import express from 'express';
import { getAll, getById, getCurrentQtyById, post, put, del } from '../controllers/materialController.js';
import { auth } from '../middleware/auth.js';

const materialRouter = express.Router();
materialRouter.get('/', auth, getAll);
materialRouter.get('/:id', auth, getById);
materialRouter.get('/:id/:qty', auth, getCurrentQtyById);
materialRouter.post('/', auth, post);
materialRouter.put('/:id', auth, put);
materialRouter.delete('/:id', auth, del);

export default materialRouter;