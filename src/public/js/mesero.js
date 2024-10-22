import { getProductsByCategory } from './funciones.js';

window.addEventListener('load', () => {
    const userId = window.userId;

    
    console.log('ID del usuario:', userId);
    getProductsByCategory();
});
