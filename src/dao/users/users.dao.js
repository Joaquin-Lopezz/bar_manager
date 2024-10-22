import { model } from 'mongoose';
import { usersSchema } from './mongoose/users.model.js';
import { usersDaoMongoose } from './mongoose/users.dao.mongoose.js';


const usersModel = model('users', usersSchema);
const daoUsers = new usersDaoMongoose(usersModel);

export function getDaoUsers() {
    return daoUsers;
}
