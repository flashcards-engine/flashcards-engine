import { Database } from "better-sqlite3";
import FlashcardModel from "../../common/types/FlashcardModel.js";
import FlashcardSetFlashcardModel from "../../common/types/FlashcardSetFlashcardModel.js";
import databaseUtil from "../util/DatabaseUtil.js";

const tableName = 'flashcard';
const joinTableName = 'flashcard_set_flashcard';

const aliasId = 'flashcard_id AS id'
const aliasPrompt = 'flashcard_prompt AS prompt';
const aliasAnswer = 'flashcard_answer AS answer';
const aliasCreatedTime = 'flashcard_created_time as createdTime';
const aliasUpdatedTime = 'flashcard_updated_time as updatedTime';
const aliasAll = `${aliasId}, ${aliasPrompt}, ${aliasAnswer}, ${aliasCreatedTime}, ${aliasUpdatedTime}`;

export default class FlashcardDataAccess {
    database: Database;
    
    constructor(database: Database) {
        this.database = database;
    }

    create(flashcardSetId: string, flashcard: FlashcardModel): FlashcardModel {
        flashcard.id = databaseUtil.newUuid();
        const flashcardSetFlashcard: FlashcardSetFlashcardModel = {
            id: databaseUtil.newUuid(),
            flashcardId: flashcard.id,
            flashcardSetId,
        };

        const transaction = this.database.transaction((
            flashcard: FlashcardModel,
            flashcardSetFlashcard: FlashcardSetFlashcardModel
        ) => {
            this.database.serialize()
            this.database.prepare(`INSERT INTO ${tableName} (flashcard_id, flashcard_prompt, flashcard_answer) VALUES (@id, @prompt, @answer)`)
                .run(flashcard);
            this.database.prepare(`INSERT INTO ${joinTableName} (flashcard_set_flashcard_id, flashcard_set_id, flashcard_id) VALUES (@id, @flashcardSetId, @flashcardId);`)
                .run(flashcardSetFlashcard);
        });

        transaction(flashcard, flashcardSetFlashcard);
        return flashcard;
    }

    update(flashcard: FlashcardModel) {
        this.database.prepare(`UPDATE ${tableName} SET flashcard_prompt = @prompt,flashcard_answer = @answer WHERE flashcard_id = @id`)
            .run(flashcard);
        return flashcard;
    }

    delete(id: string) {
        const transaction = this.database.transaction((id: string) => {
            this.database.prepare(`DELETE FROM ${joinTableName} WHERE flashcard_id = ?`).run(id);
            this.database.prepare(`DELETE FROM ${tableName} WHERE flashcard_id = ?`).run(id);
        });
        transaction(id);
    }
}
