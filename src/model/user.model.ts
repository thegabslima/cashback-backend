import { connectionDb } from '../../database/connection';
import { ResponseTypeEnum } from '../utils/enums';

export class UserModel {
    private connectionDb: any;

    constructor(){
        this.connectionDb = connectionDb();
    }
    
    async createUser(username: string, full_name: string){
        const result = await new Promise(resolve => {
            this.connectionDb.run('INSERT INTO tb_users (username, full_name) VALUES (?, ?)', [username, full_name], (err: any, result: any) => {
            if (err) {
              resolve({ type : ResponseTypeEnum.ERROR, data : err.message});
            } else {
              resolve({ type : ResponseTypeEnum.SUCCESS, data : result});
            }
          });
        });
    }

    async getUser(username: string) {
        const result = await new Promise(resolve => {
            this.connectionDb.get('SELECT * FROM tb_users WHERE username = ?', username, (err: any, result: any) => {
            if (err) {
              resolve({ type : ResponseTypeEnum.SUCCESS, data : err.message});
            } else {
              resolve({ type : ResponseTypeEnum.ERROR, data : result});
            }
          });
        });
        return result;
    }

    async getUsers(){
        const result = await new Promise(resolve => {
            this.connectionDb.all('SELECT * FROM tb_users', (err: any, result: any) => {
            if (err) {
              resolve({ type : ResponseTypeEnum.SUCCESS, data : err.message});
            } else {
              resolve({ type : ResponseTypeEnum.SUCCESS, data : result});
            }
          });
        });
        return result;
    }
}