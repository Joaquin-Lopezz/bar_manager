import { usersServices } from '../services/users.service.js';

export async function findAllUsers(req, res, next) {
    try {
        const users = await usersServices.findAllUsers();
        res.send(users);
    } catch (error) {
        next(error);
    }
}

export async function deleteUserId(req, res, next) {
    try {
        const userId = req.params.userId;
        await usersServices.deleteUserId(userId);

        res.send({ status: 'success', message: 'usuario eliminado' });
    } catch (error) {
        next(error);
    }
}

export async function findIdUser(req, res, next) {
    try {
        const userId = req.params.uid;
        const user = await usersServices.findUserById(userId);
        res.send(user);
    } catch (error) {
        next(error);
    }
}
