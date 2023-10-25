import {Database} from "sqlite3";

export default class FlashcardSetDataAccess {
    database: Database;

    constructor(database: Database) {
        this.database = database;
    }
}