import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function createUploadMiddleware(fields) {
   

    const uploadDirectory = path.join(__dirname, '../public/images');

    // Asegúrate de que el directorio de carga exista
    if (!fs.existsSync(uploadDirectory)) {
        fs.mkdirSync(uploadDirectory, { recursive: true }); // Crea el directorio si no existe
    }

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, uploadDirectory); // Carpeta donde se guardarán los archivos
        },
        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname);
        }
    });
   

    const upload = multer({ storage: storage });
   

    return (req, res, next) => {
        upload.fields(fields)(req, res, function (err) {
            if (err) {
                console.log('error multer=',err)
                return next(err);
            }
            if (req.files && req.files['thumbnail']) {
                // Aquí modificamos la ruta absoluta al responder con la relativa
                req.files['thumbnail'].forEach(file => {
                    const relativePath = path.relative(path.join(__dirname, '../'), file.path);
                    file.relativePath = '/' + relativePath.replace(/\\/g, '/'); // Normalizamos la ruta
                });
            }
            next();
        });
    };
}

export const uploadMiddleware = createUploadMiddleware([{ name: 'thumbnail', maxCount: 1 }]);