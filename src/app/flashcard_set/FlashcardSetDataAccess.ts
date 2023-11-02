import {Database} from "sqlite3";
import FlashcardSetModel from "../../common/types/FlashcardSetModel.js";
import databaseUtil from "../util/DatabaseUtil.js";

const dbName = 'flashcard_set';

const aliasId = 'flashcard_set_id AS id'
const aliasGroupId = 'flashcard_set_group_id AS groupId'
const aliasName = 'flashcard_set_name AS name'
const aliasCreatedTime = 'flashcard_set_created_time as createdTime';
const aliasUpdatedTime = 'flashcard_set_updated_time as updatedTime';
const aliasAll = `${aliasId}, ${aliasGroupId}, ${aliasName}, ${aliasCreatedTime}, ${aliasUpdatedTime}`;

const sql = {
    readByGroupId: `SELECT ${aliasAll} FROM ${dbName} WHERE flashcard_set_group_id = ?`,
    readByGroupIdWithFlashcards: `
        SELECT
            flashcard_set.flashcard_set_id AS id,
            flashcard_set.flashcard_set_group_id AS groupId,
            flashcard_set.flashcard_set_name AS name,
            flashcard_set.flashcard_set_created_time as createdTime,
            flashcard_set.flashcard_set_updated_time as updatedTime,
            set_to_flashcard.flashcard_id AS flashcardId,
            flashcard.flashcard_prompt AS flashcardPrompt,
            flashcard.flashcard_answer AS flashcardAnswer,
            flashcard.flashcard_created_time as flashcardCreatedTime,
            flashcard.flashcard_updated_time as flashcardUpdatedTime
        FROM
            flashcard_set flashcard_set
        LEFT JOIN flashcard_set_flashcard set_to_flashcard ON
            set_to_flashcard.flashcard_set_id = flashcard_set.flashcard_set_id
        LEFT JOIN flashcard flashcard ON
            flashcard.flashcard_id = set_to_flashcard.flashcard_id
        WHERE flashcard_set.flashcard_set_group_id = ?;
    `,
    readByIdWithFlashcards: `
        SELECT
            flashcard_set.flashcard_set_id AS id,
            flashcard_set.flashcard_set_group_id AS groupId,
            flashcard_set.flashcard_set_name AS name,
            flashcard_set.flashcard_set_created_time as createdTime,
            flashcard_set.flashcard_set_updated_time as updatedTime,
            set_to_flashcard.flashcard_id AS flashcardId,
            flashcard.flashcard_prompt AS flashcardPrompt,
            flashcard.flashcard_answer AS flashcardAnswer,
            flashcard.flashcard_created_time as flashcardCreatedTime,
            flashcard.flashcard_updated_time as flashcardUpdatedTime
        FROM
            flashcard_set flashcard_set
        LEFT JOIN flashcard_set_flashcard set_to_flashcard ON
            set_to_flashcard.flashcard_set_id = flashcard_set.flashcard_set_id
        LEFT JOIN flashcard flashcard ON
            flashcard.flashcard_id = set_to_flashcard.flashcard_id
        WHERE flashcard_set.flashcard_set_id = ?;
    `,
    createOne: `INSERT INTO ${dbName} (flashcard_set_id, flashcard_set_group_id, flashcard_set_name) VALUES (?, ?, ?)`,
    updateOne: `UPDATE ${dbName} SET flashcard_set_name = ? WHERE flashcard_set_id = ?`,
}

interface SelectWithFlashcardsRow {
    id: string;
    groupId: string;
    name: string;
    createdTime: number;
    updatedTime: number;
    flashcardId: string;
    flashcardPrompt: string;
    flashcardAnswer: string;
    flashcardCreatedTime: number;
    flashcardUpdatedTime: number;
}

export default class FlashcardSetDataAccess {
    database: Database;

    constructor(database: Database) {
        this.database = database;
    }

    readAllByGroupIdWithFlashcards(groupId: string): Promise<FlashcardSetModel[]> {
        return new Promise((resolve, reject) => {
            this.database.all(sql.readByGroupIdWithFlashcards, groupId, (err, rows: SelectWithFlashcardsRow[]) => {
                if (err) {
                    reject(err);
                }
                resolve(this._mapFlashcardsToFlashcardSets(rows));
            });
        });
    }
    
    readWithFlashcards(id: string): Promise<FlashcardSetModel> {
        return new Promise((resolve, reject) => {
            this.database.all(sql.readByIdWithFlashcards, id, (error: Error, rows: SelectWithFlashcardsRow[]) => {
                if (error) {
                    reject(error);
                }
                const flashcardSet = this._mapFlashcardsToFlashcardSets(rows)[0];
                resolve(flashcardSet)
            });
        });
    }

    _mapFlashcardsToFlashcardSets(rows: SelectWithFlashcardsRow[]): FlashcardSetModel[] {
        const flashcardSetMap: {[key: string]: FlashcardSetModel} = {};
        rows.forEach((row) => {
            if (!flashcardSetMap[row.id]) {
                flashcardSetMap[row.id] = {
                    id: row.id,
                    groupId: row.groupId,
                    name: row.name,
                    createdTime: row.createdTime,
                    updatedTime: row.updatedTime,
                    flashcards: [],
                };
            }
            if (row.flashcardId) {
                flashcardSetMap[row.id].flashcards?.push({
                    id: row.flashcardId,
                    prompt: row.flashcardPrompt,
                    answer: row.flashcardAnswer,
                    createdTime: row.flashcardCreatedTime,
                    updatedTime: row.flashcardUpdatedTime
                })
            }
        });
        return Object.values(flashcardSetMap);
    }

    create(flashcardSet: FlashcardSetModel) {
        return new Promise((resolve, reject) => {
            flashcardSet.id = databaseUtil.newUuid();
            this.database.run(sql.createOne, flashcardSet.id, flashcardSet.groupId, flashcardSet.name, (error: Error) => {
                if (error) {
                    reject(error);
                }
                resolve(flashcardSet);
            })
        })
    }

    update(flashcardSet: FlashcardSetModel) {
        return new Promise((resolve, reject) => {
            this.database.run(sql.updateOne, flashcardSet.name, flashcardSet.id, (error: Error) => {
                if (error) {
                    console.error(error);
                    reject(error);
                }
                resolve(flashcardSet);
            });
        })
    }
}