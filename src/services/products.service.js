//aqui va la logica de negocio

import { getDaoproducts } from '../dao/products/products.dao.js';

const productsDao = getDaoproducts();

class Productservice {
    async createProduct(product) {
        return await productsDao.createProduct(product);
    }

    async getProducts() {
        return await productsDao.getProducts();
    }
    async findAllProductByCategory(category){
        return await productsDao.findAllProductByCategory(category)

    }
    async deleteProductById(productId){
        return await productsDao.deleteProductById(productId)

    }
    async updateProduct(productId,newData){
        return await productsDao.updateProduct(productId,newData)
    }
}

export const productservice = new Productservice();
