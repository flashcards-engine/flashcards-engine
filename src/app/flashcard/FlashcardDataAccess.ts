import { Database } from "sqlite3";
import FlashcardModel from "../../common/types/FlashcardModel.js";

const dbName = 'flashcard';

const aliasId = 'flashcard_id AS id'
const aliasPrompt = 'flashcard_prompt AS prompt';
const aliasAnswer = 'flashcard_answer AS answer';
const aliasAll = `${aliasId}, ${aliasPrompt}, ${aliasAnswer}`;

const sql = {
    updateOne: `UPDATE ${dbName} SET flashcard_prompt = ?, flashcard_answer = ? WHERE flashcard_id = ?`,
}

export default class FlashcardDataAccess {
    database: Database;
    
    constructor(database: Database) {
        this.database = database;
    }

    update(flashcard: FlashcardModel) {
        return new Promise((resolve, reject) => {
            this.database.run(sql.updateOne, flashcard.prompt, flashcard.answer, flashcard.id, (error: Error) => {
                if (error) {
                    reject(error);
                }
                resolve(flashcard);
            });
        })
    }
}
