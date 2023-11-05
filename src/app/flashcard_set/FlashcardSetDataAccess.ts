import {Database} from "better-sqlite3";
import FlashcardSetModel from "../../common/types/FlashcardSetModel.js";
import databaseUtil from "../util/DatabaseUtil.js";

const tableName = 'flashcard_set';

const aliasId = 'flashcard_set_id AS id'
const aliasGroupId = 'flashcard_set_group_id AS groupId'
const aliasName = 'flashcard_set_name AS name'
const aliasCreatedTime = 'flashcard_set_created_time as createdTime';
const aliasUpdatedTime = 'flashcard_set_updated_time as updatedTime';
const aliasAll = `${aliasId}, ${aliasGroupId}, ${aliasName}, ${aliasCreatedTime}, ${aliasUpdatedTime}`;

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

    readAllByGroupIdWithFlashcards(groupId: string): FlashcardSetModel[] {
        const rows = this.database.prepare(`
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
        `).all(groupId) as SelectWithFlashcardsRow[];

        return this._mapFlashcardsToFlashcardSets(rows);
    }

    readWithFlashcards(id: string): FlashcardSetModel | undefined {
        const rows = this.database.prepare(`
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
        `).all(id) as SelectWithFlashcardsRow[];

        return rows.length > 0 ? this._mapFlashcardsToFlashcardSets(rows)[0] : undefined;
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

    create(flashcardSet: FlashcardSetModel): FlashcardSetModel {
        flashcardSet.id = databaseUtil.newUuid();
        this.database.prepare(`INSERT INTO ${tableName} (flashcard_set_id, flashcard_set_group_id, flashcard_set_name)VALUES (@id, @groupId, @name)`)
            .run(flashcardSet);
        return flashcardSet;
    }

    update(flashcardSet: FlashcardSetModel) {
        this.database.prepare(`UPDATE ${tableName} SET flashcard_set_name = @name WHERE flashcard_set_id = @id`)
            .run(flashcardSet);
        return flashcardSet;
    }
}