import express from 'express';
import { getSimpleAll, getAll, getById, getCurrentQtyById, post, put, del, getMaterialExists } from '../controllers/materialController.js';
import { auth } from '../middleware/auth.js';

const materialRouter = express.Router();
materialRouter.get('/', auth, getSimpleAll);
materialRouter.get('/all', auth, getAll);
materialRouter.get('/:id', auth, getById);
materialRouter.get('/check/type/:type/value/:value', auth, getMaterialExists);
materialRouter.get('/:id/:qty', auth, getCurrentQtyById);
materialRouter.post('/', auth, post);
materialRouter.put('/:id', auth, put);
materialRouter.delete('/:id', auth, del);

export default materialRouter;