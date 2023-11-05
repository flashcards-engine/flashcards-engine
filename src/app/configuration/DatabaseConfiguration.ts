import sqlite3 from 'better-sqlite3';
import { Database } from 'better-sqlite3';

const databaseFilename = 'flashcards.db';

export default {
    getConnection(databaseFilename: string): Database {
        const database = sqlite3(databaseFilename);
        database.pragma('journal_mode = WAL');
        database.pragma('foreign_key = true');
        return database;
    },
    
    getFilename() {
        return databaseFilename;
    }
}