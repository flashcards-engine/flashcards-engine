import {Database} from "sqlite3";
import FlashcardSetModel from "../../common/types/FlashcardSetModel.js";

const dbName = 'flashcard_set';

const aliasId = 'flashcard_set_id AS id'
const aliasGroupId = 'flashcard_set_group_id AS groupId'
const aliasName = 'flashcard_set_name AS name'
const aliasAll = `${aliasId}, ${aliasGroupId}, ${aliasName}`;

const sql = {
    readByGroupId: `SELECT ${aliasAll} FROM ${dbName} WHERE flashcard_set_group_id = ?`,
    readByGroupIdWithFlashcards: `
        SELECT
            flashcard_set.flashcard_set_id AS id,
            flashcard_set.flashcard_set_group_id AS groupId,
            flashcard_set.flashcard_set_name AS name,
            set_to_flashcard.flashcard_id AS flashcardId,
            flashcard.flashcard_prompt AS flashcardPrompt,
            flashcard.flashcard_answer AS flashcardAnswer
        FROM
            flashcard_set flashcard_set
        LEFT JOIN flashcard_set_flashcard set_to_flashcard ON
            set_to_flashcard.flashcard_set_id = flashcard_set.flashcard_set_id
        LEFT JOIN flashcard flashcard ON
            flashcard.flashcard_id = set_to_flashcard.flashcard_id
        WHERE flashcard_set.flashcard_set_group_id = ?;
    `
}

interface SelectWithFlashcardsRow {
    id: string;
    groupId: string;
    name: string;
    flashcardId: string;
    flashcardPrompt: string;
    flashcardAnswer: string;
}

export default class FlashcardSetDataAccess {
    database: Database;

    constructor(database: Database) {
        this.database = database;
    }

    async readAllByGroupIdWithFlashcards(groupId: string): Promise<FlashcardSetModel[]> {
        return new Promise((resolve, reject) => {
            this.database.all(sql.readByGroupIdWithFlashcards, groupId, (err, rows: SelectWithFlashcardsRow[]) => {
                if (err) {
                    reject(err);
                }

                // Map rows to FlashcardSetModels
                const flashcardSetMap: {[key: string]: FlashcardSetModel} = {};
                rows.forEach((row) => {
                    if (!flashcardSetMap[row.id]) {
                        flashcardSetMap[row.id] = {
                            id: row.id,
                            groupId: row.groupId,
                            name: row.name,
                            flashcards: []
                        };
                    }
                    if (row.flashcardId) {
                        flashcardSetMap[row.id].flashcards?.push({
                            id: row.flashcardId,
                            prompt: row.flashcardPrompt,
                            answer: row.flashcardAnswer
                        })
                    }
                });

                resolve(Object.values(flashcardSetMap));
            });
        });
    }
}