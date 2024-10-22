import { toPOJO } from '../../pojo.js';

export class productoDaoMongoose {
    constructor(productsModel) {
        this.productsModel = productsModel;
    }

    async createProduct(product) {
        let newProduct = await this.productsModel.create(product);
        return toPOJO(newProduct);
    }

    async getProducts(product) {
        let products = await this.productsModel.find(product);
        return toPOJO(products);
    }
    async findAllProductByCategory(category) {
        return await this.productsModel.find(category);
    }
    async deleteProductById(productId) {
        return await this.productsModel.findByIdAndDelete(productId);
    }

    async updateProduct(productId,newData){
        return await this.productsModel.findByIdAndUpdate(productId,newData)
    }
}
