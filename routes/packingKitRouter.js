import express from 'express';
import { getAll, getById, post, put, del, getPackingKitExists } from '../controllers/packingKitController.js';
import { auth } from '../middleware/auth.js';

const packingKitRouter = express.Router();
packingKitRouter.get('/', auth, getAll);
packingKitRouter.get('/:id', auth, getById);
packingKitRouter.get('/check/type/:type/value/:value', auth, getPackingKitExists);
packingKitRouter.post('/', auth, post);
packingKitRouter.put('/:id', auth, put);
packingKitRouter.delete('/:id', auth, del);

export default packingKitRouter;