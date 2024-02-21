import { UserModel } from '../model/user.model';

export class UserService {
    private userModel: UserModel;

    constructor(){
        this.userModel = new UserModel();
    }

    async createUser(username: string, full_name: string){
        return await this.userModel.createUser(username, full_name);
    }

    async getUser(username: string){
        return await this.userModel.getUser(username);
    }

    async getUsers(){
        const dataResult = await this.userModel.getUsers();
        return dataResult;
    }
}