import { Router } from 'express';

export const webRouter = Router();

webRouter.get('/', (req, res) => {
    return res.redirect('/login');
});

webRouter.get('/usuarios', function (req, res) {
    res.render('users.handlebars', {
        pageTitle: 'usuarios',
    });
});

webRouter.get('/login', function (req, res) {
    res.render('login.handlebars', {
        pageTitle: 'Login',
    });
});

webRouter.get('/home', midlewareRol);

function midlewareRol(req, res, next) {
   // console.log(req.session.userId)
    res.render('mesero.handlebars', {
        pageTitle: 'mesero',
        // rol: rol,
     //   userId: req.session.userId,
    });
    /*const { rol } = req.session;

    switch (rol) {
        case 'admin':
            res.render('admin.handlebars', {
                pageTitle: 'admin',
                rol: rol, 
            });
            break;
        case 'mesero':
            res.render('mesero.handlebars', {
                pageTitle: 'mesero',
                rol: rol,
            });
            break;
        case 'cajero':
            res.render('cajero.handlebars', {
                pageTitle: 'cajero',
                rol: rol,
            });
            break;
        default:
            res.send('error en inicio de sesión');
    }*/
}
