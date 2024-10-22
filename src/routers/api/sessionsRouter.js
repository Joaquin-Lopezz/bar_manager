import { Router } from 'express';
import { login,register } from '../../controllers/sessions.controller.js';
export const sessionRouter = Router();

sessionRouter.post('/register',register);


sessionRouter.post('/login',login);
