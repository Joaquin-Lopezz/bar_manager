import { productservice } from '../services/products.service.js';

/*
1. Controlador (Controllers):
- El controlador actúa como intermediario entre la capa de servicios y las solicitudes HTTP.
Aquí es donde se manejan los errores relacionados con el flujo HTTP,
como respuestas con código de estado (e.g., 400, 500, etc.).

2-La lógica en esta capa debería ser mínima, limitándose a procesar 
las solicitudes (como extraer datos del req.body, parámetros, etc.), delegar a la capa de servicios
y finalmente enviar una respuesta.

3- Manejo de errores: Usa try-catch para capturar los errores provenientes de 
la capa de servicios y llama a next(error) para delegar el manejo del error a un middleware. 
*/
export async function deleteProduct(req, res, next) {
    try {
        const productId = req.params.pid;
        const productoDelete = await productservice.deleteProductById(
            productId
        );
        console.log(productoDelete);
        res.send({ status: 'success', message: 'producto eliminado' });
    } catch (error) {
        next(error);
    }
}

export async function updateProduct(req, res, next) {
    try {
        let product = {
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,

            category: req.body.category,
        };
        if (req.files['thumbnail']) {
            product.thumbnail = req.files['thumbnail'][0].relativePath;
        }

        const productId = req.params.pid;

        const productoUpdate = await productservice.updateProduct(
            productId,
            product
        );
        res.send({ status: 'success', payload: productoUpdate });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

export async function createProduct(req, res, next) {
    try {
        let product = {
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            thumbnail: req.files['thumbnail']
                ? req.files['thumbnail'][0].relativePath
                : null,
            category: req.body.category,
        };
        let createProduct = await productservice.createProduct(product);
        res.send(createProduct);
    } catch (error) {
        next(error);
    }
}

export async function getProducts(req, res, next) {
    try {
        let products = await productservice.getProducts();
        res.send(products);
    } catch (error) {
        next(error);
    }
}

export async function getProductsByCategory(req, res, next) {
    try {
        const category = req.params.category;
        const productos = await productservice.findAllProductByCategory({
            category: category,
        });
        res.send(productos);
    } catch (error) {
        next(error);
    }
}
