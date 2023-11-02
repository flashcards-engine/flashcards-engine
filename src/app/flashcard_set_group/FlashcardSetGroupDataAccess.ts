import { Database } from 'sqlite3';
import databaseUtil from "../util/DatabaseUtil.js";
import FlashcardSetGroupModel from "../../common/types/FlashcardSetGroupModel.js";

const dbName = 'flashcard_set_group';

const aliasId = 'flashcard_set_group_id AS id';
const aliasName = 'flashcard_set_group_name AS name';
const aliasParentId = 'flashcard_set_group_parent_id AS parentId';
const aliasCreatedTime = 'flashcard_set_group_created_time as createdTime';
const aliasUpdatedTime = 'flashcard_set_group_updated_time as updatedTime';
const aliasAll = `${aliasId}, ${aliasName}, ${aliasParentId}, ${aliasCreatedTime}, ${aliasUpdatedTime}`;

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
            set_group.flashcard_set_group_created_time as createdTime,
            set_group.flashcard_set_group_updated_time as updatedTime,
            child_group.flashcard_set_group_id AS childId,
            child_group.flashcard_set_group_name AS childName,
            child_group.flashcard_set_group_created_time as childCreatedTime,
            child_group.flashcard_set_group_updated_time as childUpdatedTime
        FROM 
            flashcard_set_group set_group
        LEFT JOIN flashcard_set_group child_group ON
            child_group.flashcard_set_group_parent_id = set_group.flashcard_set_group_id
        WHERE set_group.flashcard_set_group_id = ?;
    `,
    updateOne: `UPDATE ${dbName} SET flashcard_set_group_name = ? WHERE flashcard_set_group_id = ?`,
}

interface SelectWithChildrenRow {
    id: string;
    parentId: string;
    name: string;
    createdTime: number;
    updatedTime: number;
    childId: string;
    childName: string;
    childCreatedTime: number;
    childUpdatedTime: number;
}

export default class FlashcardSetGroupDataAccess {
    database: Database;

    constructor(database: Database) {
        this.database = database;
    }

    async readByParentId(id?: string): Promise<FlashcardSetGroupModel[] | undefined> {
        return new Promise((resolve, reject) => {
            const query = id ? sql.readByParentId : sql.readByNullParentId;
            this.database.all(query, (err, row: FlashcardSetGroupModel[]) => {
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
            this.database.run(
                sql.createOne,
                flashcardSetGroup.id,
                flashcardSetGroup.parentId,
                flashcardSetGroup.name,
                (err: Error) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(flashcardSetGroup);
                }
            );
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
                            createdTime: row.createdTime,
                            updatedTime: row.updatedTime,
                            childGroups: [],
                            flashcardSets: []
                        }
                    }
                    if (row.childId) {
                        flashcardSetGroup?.childGroups?.push({
                            id: row.childId,
                            name: row.childName,
                            parentId: row.id,
                            createdTime: row.childCreatedTime,
                            updatedTime: row.childUpdatedTime,
                        });
                    }
                });

                resolve(flashcardSetGroup);
            });
        });
    }

    update(flashcardSetGroup: FlashcardSetGroupModel): Promise<FlashcardSetGroupModel> {
        return new Promise((resolve, reject) => {
            this.database.run(sql.updateOne, flashcardSetGroup.name, flashcardSetGroup.id, () => {
                resolve(flashcardSetGroup);
            });
        })
    }
}