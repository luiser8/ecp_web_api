import express from 'express';
import { getAll, getById, post, put, login, del, loginRefresh } from '../controllers/userController.js';
import { auth } from '../middleware/auth.js';

const userRouter = express.Router();
userRouter.get('/', auth, getAll);
userRouter.get('/:id', auth, getById);
userRouter.post('/', post);
userRouter.put('/:id', auth, put);
userRouter.post('/login', login);
userRouter.post('/loginrefresh', loginRefresh);
userRouter.delete('/:id', auth, del);

export default userRouter;