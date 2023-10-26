import { Database } from "sqlite3";
import FlashcardModel from "./FlashcardModel.js";

export default class FlashcardDataAccess {
    database: Database;
    
    constructor(database: Database) {
        this.database = database;
    }
    
    async create(flashcard: FlashcardModel) {
        const stmt = this.database.prepare(
            'INSERT INTO flashcard (flashcard_id, flashcard_prompt, flashcard_answer) VALUES (?, ?, ?)');
        stmt.run(flashcard.id, flashcard.prompt, flashcard.answer);
        
    }

    async read(id: string) {
        const stmt = this.database.prepare('SELECT * FROM flashcard WHERE id = ?');
        stmt.run(id);
    }
}
