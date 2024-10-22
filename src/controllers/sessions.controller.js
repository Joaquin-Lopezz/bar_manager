import { usersServices } from '../services/users.service.js';

export async function register(req, res, next) {
    try {
        let dataUsers = req.body;
        console.log(dataUsers)
 
        let user = await usersServices.register(dataUsers);
        res.send(user);
    } catch (error) {
        next(error);
    }
}

export async function login(req, res, next) {
    try {
        let dataUsers = req.body;

      
        let user = await usersServices.login(dataUsers);
        req.session.userId = user._id;
        req.session.rol = user.rol;
   
        res.status(200).json({ message: 'Inicio de sesión exitoso' });
    } catch (error) {
        next(error);
    }
    
}


