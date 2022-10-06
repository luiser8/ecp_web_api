import express from 'express';
import { getAll, getById, post, put, del, getSimpleAll, getExists, getByDad } from '../controllers/categoryController.js';
import { auth } from '../middleware/auth.js';

const categoryRouter = express.Router();
categoryRouter.get('/', auth, getSimpleAll);
categoryRouter.get('/all', auth, getAll);
categoryRouter.get('/:id', auth, getById);
categoryRouter.get('/dad/:dad', auth, getByDad);
categoryRouter.get('/check/type/:type/value/:value', auth, getExists);
categoryRouter.post('/', auth, post);
categoryRouter.put('/:id', auth, put);
categoryRouter.delete('/:id', auth, del);

export default categoryRouter;