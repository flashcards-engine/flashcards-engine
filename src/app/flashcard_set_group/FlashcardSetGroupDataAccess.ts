import { Database } from 'sqlite3';
import databaseUtil from "../util/DatabaseUtil.js";
import FlashcardSetGroupModel from "./FlashcardSetGroupModel.js";

const dbName = 'flashcard_set_group';

const aliasId = 'flashcard_set_group_id AS id'
const aliasName = 'flashcard_set_group_name AS name'
const aliasParentId = 'flashcard_set_group_parent_id AS parentId'
const aliasAll = `${aliasId}, ${aliasName}, ${aliasParentId}`;

const sql = {
    readRoot: `SELECT ${aliasAll} FROM ${dbName} WHERE flashcard_set_group_parent_id IS NULL`,
    readRowById: `SELECT ${aliasAll} FROM ${dbName} WHERE flashcard_set_group_id = ?`,
    readRowByName: `SELECT ${aliasAll} FROM ${dbName} WHERE flashcard_set_group_name = ?`,
    readByParentId: `SELECT ${aliasAll} FROM ${dbName} WHERE flashcard_set_group_parent_id = ?`,
    readByNullParentId: `SELECT ${aliasAll} FROM ${dbName} WHERE flashcard_set_group_parent_id IS NULL`,
    createOne: `INSERT INTO ${dbName} (flashcard_set_group_id, flashcard_set_group_parent_id, flashcard_set_group_name) VALUES (?, ?, ?)`,
}

export default class FlashcardSetGroupDataAccess {
    database: Database;

    constructor(database: Database) {
        this.database = database;
    }

    async readByParentId(id?: string): Promise<FlashcardSetGroupModel> {
        return new Promise((resolve, reject) => {
            const query = id ? sql.readByParentId : sql.readByNullParentId;
            console.log(query);
            this.database.get(query, (err, row: FlashcardSetGroupModel) => {
                if (err) {
                    reject(err);
                }
                resolve(row ? row : null);
            });
        });
    }

    async create(flashcardSetGroup: FlashcardSetGroupModel): Promise<FlashcardSetGroupModel> {
        return new Promise((resolve, reject) => {
            flashcardSetGroup.id = databaseUtil.newUuid();
            this.database.run(sql.createOne, flashcardSetGroup.id, flashcardSetGroup.parentId, flashcardSetGroup.name, (err: Error) => {
                if (err) {
                    reject(err);
                }
                resolve(flashcardSetGroup);
            });
        });
    }

    async read(id: string): Promise<FlashcardSetGroupModel> {
        return new Promise((resolve, reject) => {
            this.database.get(sql.readRowById, id, (err: Error, row: FlashcardSetGroupModel) => {
                if (err) {
                    reject(err);
                }
                resolve(row ? row : null);
            })
        });
    }

    async readByName(name: string): Promise<FlashcardSetGroupModel> {
        return new Promise((resolve, reject) => {
            this.database.get(sql.readRowByName, name, (err: Error, row: FlashcardSetGroupModel) => {
                if (err) {
                    reject(err);
                }
                resolve(row ? row : null);
            });
        })
    }
}
