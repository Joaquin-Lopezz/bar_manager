import {
    newProduct,
    redirectButtonUser,
    getProductsByCategory,
} from './funciones.js';

window.addEventListener('load', async () => {
    redirectButtonUser();
    newProduct();
    getProductsByCategory();
});
