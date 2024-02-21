import { TransactionModel } from "../model/transaction.model";
import { CashBackService } from "./cashback.service";

export class TransactionService {
    private transactionModel: TransactionModel;

    constructor(){
        this.transactionModel = new TransactionModel();
    }

    createTransaction(userId: number, amount: number, description: string, installment: number){
        return this.transactionModel.createTransaction(userId, amount, description, installment);
    }

    async getTransactions(){
        const transaction =  await this.transactionModel.getTransactions();
        await transaction.data.forEach(async (item: any) => {
            const amountTax = this.calculateAmountTax(item.amount, item.tax);
            const installments = this.calculateInstallmentsWithTax(item.amount, amountTax, item.installment, item.percent_callback);
        
            item.amountTax = amountTax;
            item.installments = installments;
        })
     
        return transaction;
    }

    calculateAmountTax(amount: any, tax: any) {
        return (amount * tax) / 100;
    }

    async getTransactionById(transactionId: number){
        return await this.transactionModel.getTransactionById(transactionId);
    }

    calculateInstallmentsWithTax(amount: number, amountTax: number, installment: number, percent_callback: number){
        const installments = [];
        const cashBackService = new CashBackService();
        const cashBack = cashBackService.getCashBackByTax(amountTax, percent_callback);

        for (let i = 1; i <= installment; i++) {
            installments.push({
                installment: i,
                amount: ((amount / installment) + amountTax).toFixed(2),
                cashBack: cashBack.toFixed(2)
            });
        }
        return installments;
    }
}