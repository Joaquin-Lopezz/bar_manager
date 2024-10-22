import { Router } from 'express';
import {findIdUser,
    deleteUserId,
    findAllUsers,
} from '../../controllers/users.controller.js';

export const usersRouter = Router();

usersRouter.get('/', findAllUsers);

usersRouter.get('/:uid', findIdUser);


usersRouter.delete('/:userId', deleteUserId);
