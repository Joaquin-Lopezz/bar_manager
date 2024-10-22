//aqui va la logica de negocio
import bcrypt from 'bcryptjs';
import { getDaoUsers } from '../dao/users/users.dao.js';
const usersDao = getDaoUsers();

class UsersService {
    async register(data) {
        data.password = await bcrypt.hash(data.password, 10);
        return await usersDao.createUser(data);
    }

    async login(data) {
        let user = await usersDao.findOneDni({ dni: data.dni });
        await this.compareData(user, data.password);
        return user;
    }

    async compareData(user, password) {
        if (!user) {
            throw new Error('usuario no encontrado ');
        }
        if (!(await bcrypt.compare(password, user.password))) {
            throw new Error('Contraseña incorrecta');
        }
    }

    async findAllUsers() {
        return await usersDao.findAllUsers();
    }


    async deleteUserId(userId){
        return await usersDao.deleteUserId(userId)

    }
    async findUserById(userId){
        return await usersDao.findUserById(userId)
    }
}

export const usersServices = new UsersService();
