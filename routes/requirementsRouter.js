import express from 'express';
import { getAll } from '../controllers/requirementsController.js';
import { auth } from '../middleware/auth.js';

const requirementsRouter = express.Router();
requirementsRouter.get('/', auth, getAll);

export default requirementsRouter;