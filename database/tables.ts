export function createTables(db: any)  {
    createTableUsers(db);
    createTableTransaction(db);
    createTableCashBack(db);
}

function createTableTransaction(db: any) {
    db.exec(`
    CREATE TABLE IF NOT EXISTS tb_transactions
    (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INT,
        amount DECIMAL(10, 2) NOT NULL,
        tax DECIMAL(10, 2) NOT NULL,
        installment INT NOT NULL,
        date DATE NOT NULL,
        description TEXT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES tb_users(id)
    );
  `);
}

function createTableUsers(db: any) {
    db.exec(`
    CREATE TABLE IF NOT EXISTS tb_users
    (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username VARCHAR(50) NOT NULL,
        full_name VARCHAR(100) NOT NULL
    );
  `);
}

function createTableCashBack(db: any) {
    db.exec(`
    CREATE TABLE IF NOT EXISTS tb_cashback 
    (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INT,
        transaction_id INT,
        date DATE NOT NULL,
        percent_callback INT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES tb_users(id),
        FOREIGN KEY (transaction_id) REFERENCES tb_transactions(id)
    );
  `);
}
