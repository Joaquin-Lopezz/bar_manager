import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { engine } from 'express-handlebars';
import { webRouter } from './routers/web/webRouter.js';
import { apiRouter } from './routers/api/apiRouter.js';
import mongoose from 'mongoose';
import { MONGODB_CNX_STR, secretKey } from './config/config.js';
import sessions from 'express-session';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.listen(8080, () => console.log('conectado'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    sessions({
        secret: secretKey,
        resave: false, // Normalmente no es necesario volver a guardar la sesión si no ha sido modificada
        saveUninitialized: false, // No guarda sesiones no inicializadas
        cookie: {
            secure: false, // Cambia a true si usas HTTPS
            httpOnly: true, // Previene el acceso desde JavaScript
        },
    })
);
app.use('/public', express.static(path.join(__dirname, 'public')));

app.engine('handlebars', engine());
app.set('views', path.join(__dirname, 'views'));

await mongoose.connect(MONGODB_CNX_STR);
console.log('conectado a mongoose');

app.use('/api', apiRouter);
app.use('/', webRouter);

app.use((err, req, res, next) => {
    console.error(err.stack); 
    res.status(500).json({ message: err.message });
});
