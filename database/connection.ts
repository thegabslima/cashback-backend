import * as sqlite3 from 'sqlite3';
import { createTables } from './tables';
import * as fs from 'fs';

const filePath = './database.db';

export function connectionDb(): sqlite3.Database {
    if (fs.existsSync(filePath)){
        const db = new sqlite3.Database(filePath);
        db.get("PRAGMA foreign_keys = ON")
        return db;
    }else{
        const db = new sqlite3.Database(filePath, (error) => {
        if (error) {
            return console.error(error.message);
        } 
        createTables(db);
    });
        return db;
    }
}