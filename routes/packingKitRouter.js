import express from 'express';
import { getAll, getById, post, put, del } from '../controllers/packingKitController.js';
import { auth } from '../middleware/auth.js';

const packingKitRouter = express.Router();
packingKitRouter.get('/', auth, getAll);
packingKitRouter.get('/:id', auth, getById);
packingKitRouter.post('/', auth, post);
packingKitRouter.put('/:id', auth, put);
packingKitRouter.delete('/:id', auth, del);

export default packingKitRouter;