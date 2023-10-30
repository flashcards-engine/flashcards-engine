import { Database } from 'sqlite3';
import databaseUtil from "../util/DatabaseUtil.js";
import FlashcardSetGroupModel from "../../common/types/FlashcardSetGroupModel.js";

const dbName = 'flashcard_set_group';

const aliasId = 'flashcard_set_group_id AS id'
const aliasName = 'flashcard_set_group_name AS name'
const aliasParentId = 'flashcard_set_group_parent_id AS parentId'
const aliasAll = `${aliasId}, ${aliasName}, ${aliasParentId}`;

const sql = {
    readRowById: `SELECT ${aliasAll} FROM ${dbName} WHERE flashcard_set_group_id = ?`,
    readByParentId: `SELECT ${aliasAll} FROM ${dbName} WHERE flashcard_set_group_parent_id = ?`,
    readByNullParentId: `SELECT ${aliasAll} FROM ${dbName} WHERE flashcard_set_group_parent_id IS NULL`,
    createOne: `INSERT INTO ${dbName} (flashcard_set_group_id, flashcard_set_group_parent_id, flashcard_set_group_name) VALUES (?, ?, ?)`,
    readWithChildren: `
        SELECT
            set_group.flashcard_set_group_id AS id,
            set_group.flashcard_set_group_parent_id AS parentId,
            set_group.flashcard_set_group_name AS name,
            child_group.flashcard_set_group_id AS childId,
            child_group.flashcard_set_group_name AS childName
        FROM 
            flashcard_set_group set_group
        LEFT JOIN flashcard_set_group child_group ON
            child_group.flashcard_set_group_parent_id = set_group.flashcard_set_group_id
        WHERE set_group.flashcard_set_group_id = ?;
    `
}

interface SelectWithChildrenRow {
    id: string;
    parentId: string;
    name: string;
    childId: string;
    childName: string;
}

export default class FlashcardSetGroupDataAccess {
    database: Database;

    constructor(database: Database) {
        this.database = database;
    }

    async readByParentId(id?: string): Promise<FlashcardSetGroupModel | undefined> {
        return new Promise((resolve, reject) => {
            const query = id ? sql.readByParentId : sql.readByNullParentId;
            this.database.get(query, (err, row: FlashcardSetGroupModel) => {
                if (err) {
                    reject(err);
                }
                resolve(row);
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

    async readWithChildren(id: string): Promise<FlashcardSetGroupModel | undefined> {
        return new Promise((resolve, reject) => {
            this.database.all(sql.readWithChildren, id, (err: Error, rows: SelectWithChildrenRow[]) => {
                if (err) {
                    reject(err);
                }

                // Map rows to FlashcardSetGroupModel
                let flashcardSetGroup: FlashcardSetGroupModel | undefined = undefined;
                rows.forEach((row) => {
                    if (!flashcardSetGroup) {
                        flashcardSetGroup = {
                            id: row.id,
                            parentId: row.parentId,
                            name: row.name,
                            childGroups: [],
                            flashcardSets: []
                        }
                    }
                    if (row.childId) {
                        flashcardSetGroup?.childGroups?.push({
                            id: row.childId,
                            name: row.childName
                        });
                    }
                });

                resolve(flashcardSetGroup);
            })
        });
    }
}