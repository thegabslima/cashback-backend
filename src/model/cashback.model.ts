import { connectionDb } from '../../database/connection';
import { CashBackEnum, ResponseTypeEnum } from '../utils/enums';

export class CashBackModel {
    private connectionDb: any;

    constructor(){
        this.connectionDb = connectionDb();
    }

    createCashBack(userId: number, transactionId: number){
        return this.connectionDb.run('INSERT INTO tb_cashback (user_id, transaction_id, date, percent_callback) VALUES (?, ?, DATE(), ?)', 
        [userId, transactionId, CashBackEnum.CASHBACK], function(err: any, result: any) {
            if (err) {
              return { type : ResponseTypeEnum.ERROR, data : err.message};
            } else {
              return { type : ResponseTypeEnum.SUCCESS, data : result};
            }
        });
    }

    async getCashBacks(){
        const result = await new Promise(resolve => {
            this.connectionDb.all('SELECT * FROM tb_cashback', (err: any, result: any) => {
            if (err) {
              resolve({ type : ResponseTypeEnum.ERROR, data : err.message});
            } else {
              resolve({ type : ResponseTypeEnum.SUCCESS, data : result});
            }
          });
        });
        return result;
    }

    async getCashBackById(cashBackId: number,){
        const result = await new Promise(resolve => {
            this.connectionDb.get('SELECT * FROM tb_cashback WHERE id = ? ', cashBackId, (err: any, result: any) => {
            if (err) {
              resolve({ type : ResponseTypeEnum.ERROR, data : err.message});
            } else {
              resolve({ type : ResponseTypeEnum.SUCCESS, data : result});
            }
          });
        });
        return result;
    }
}