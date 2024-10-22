import { model } from 'mongoose';
import { productSchema } from './mongoose/products.model.js';
import { productoDaoMongoose } from './mongoose/products.dao.mongoose.js';

const productsModel = model('products', productSchema);
const daoProducts = new productoDaoMongoose(productsModel);

export function getDaoproducts() {
    return daoProducts;
}
