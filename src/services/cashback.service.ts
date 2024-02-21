import { CashBackModel } from "../model/cashback.model";

export class CashBackService {

    private cashBackModel: CashBackModel;
    
    constructor(){
        this.cashBackModel = new CashBackModel();
    }

    getCashBackByTax(amountTax: number, percent_callback: number){
        return (amountTax * percent_callback) / 100; 
    }
}