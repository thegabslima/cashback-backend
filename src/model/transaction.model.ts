import { connectionDb } from '../../database/connection';
import { ResponseTypeEnum, TransactionTaxEnum } from '../utils/enums';
import { CashBackModel } from './cashback.model';

export class TransactionModel {
    private connectionDb: any;

    constructor(){
        this.connectionDb = connectionDb();
    }

    createTransaction(userId: number, amount: number, description: string, installment: number){
        this.connectionDb.run('INSERT INTO tb_transactions (user_id, amount, date, description, tax, installment) VALUES (?, ?, DATE(), ?, ?, ?)', 
        [userId, amount, description, TransactionTaxEnum.TAX, installment], function(err: any) {
            if (err) {
              return { type : ResponseTypeEnum.ERROR, data : err.message}
            }
            // @ts-ignore -- para ignorar o contexto do 'THIS' mesmo com escopo não-lexico
            const lastTransactionId = this.lastID;
            const cashBackModel = new CashBackModel();
            const resultCashBack = cashBackModel.createCashBack(userId, lastTransactionId);

            if (resultCashBack.type === ResponseTypeEnum.ERROR){
                return { type : ResponseTypeEnum.ERROR, data : resultCashBack.data};
            }
            
            return { type : ResponseTypeEnum.SUCCESS, data : resultCashBack.data};
          });
    }

    async getTransactions(): Promise<any>{
        const result = await new Promise(resolve => {
            this.connectionDb.all('SELECT tb_transactions.* , tb_users.full_name, tb_cashback.* FROM tb_transactions JOIN tb_users on tb_transactions.user_id = tb_users.id JOIN tb_cashback on tb_cashback.transaction_id = tb_transactions.id', (err: any, result: any) => {
            if (err) {
              resolve({ type : ResponseTypeEnum.ERROR, data : err.message});
            } else {
              resolve({ type : ResponseTypeEnum.SUCCESS, data : result});
            }
          });
        });
        return result;
    }

    async getTransactionById(transactionId: number,){
        const result = await new Promise(resolve => {
            this.connectionDb.get('SELECT * FROM tb_transactions WHERE id = ? ', transactionId, (err: any, result: any) => {
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