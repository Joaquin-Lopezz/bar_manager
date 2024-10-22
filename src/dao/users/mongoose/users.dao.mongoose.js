import { toPOJO } from '../../pojo.js';


export class usersDaoMongoose {
    constructor(userModel) {
        this.userModel = userModel;
    }

    async findAllUsers() {
        const users = await this.userModel.find();
        return users;
    }

    async createUser(data) {
        const user = await this.userModel.create(data);
        return toPOJO(user);
    }

    async findOneDni(dni) {
        const user = await this.userModel.findOne(dni);
        return toPOJO(user);
    }

    async deleteUserId(userId) {
        return await this.userModel.findByIdAndDelete(userId);
    }
    async findUserById(userId){
        return await this.userModel.findById(userId)
    }
}
