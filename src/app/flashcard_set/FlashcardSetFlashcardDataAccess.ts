import {Database} from "sqlite3";

export default class FlashcardSetFlashcardDataAccess {
    database: Database;
    
    constructor(database: Database) {
        this.database = database;
    }
}