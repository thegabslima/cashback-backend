import express from 'express';
import { TransactionService } from './services/transaction.service';
import { UserService } from './services/user.service';

const app = express();
app.use(express.json())
app.use(function (req, res, next){
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    next();
})
const port = 3000;

const transactionService = new TransactionService();
const userService = new UserService();

app.post('/users/add', async (req: any, res: any) => {
    const { username, full_name } = req.body;
    const result = await userService.createUser(username, full_name);
    res.send(result);
    }
);

app.get('/users/all', async (req: any, res: any) => {
    const result = await userService.getUsers();
    res.send(result);
    }
);

app.get('/users/:username', async (req: any, res: any) => {
    const { username } = req.params;
    const result = await userService.getUser(username);
    res.send(result);
    }
);

app.post('/transactions/add', (req: any, res: any) => {
    const { userId, amount, description, installment } = req.body;
    const result = transactionService.createTransaction(userId, amount, description, installment);
    res.send(result);
    }
);

app.get('/transactions/all', async (req: any, res: any) => {
    const result = await transactionService.getTransactions();
    res.send(result);
    }
);

app.get('/transaction/:transactionId', async (req: any, res: any) => {
    const { transactionId } = req.params;
    const result = await transactionService.getTransactionById(transactionId);
    res.send(result);
    }
);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
    }
);