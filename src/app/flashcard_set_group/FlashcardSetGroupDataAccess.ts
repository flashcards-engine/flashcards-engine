import { Database, Statement } from 'better-sqlite3';
import databaseUtil from "../util/DatabaseUtil.js";
import FlashcardSetGroupModel from "../../common/types/FlashcardSetGroupModel.js";

const tableName = 'flashcard_set_group';

const aliasId = 'flashcard_set_group_id AS id';
const aliasName = 'flashcard_set_group_name AS name';
const aliasParentId = 'flashcard_set_group_parent_id AS parentId';
const aliasCreatedTime = 'flashcard_set_group_created_time as createdTime';
const aliasUpdatedTime = 'flashcard_set_group_updated_time as updatedTime';
const aliasAll = `${aliasId}, ${aliasName}, ${aliasParentId}, ${aliasCreatedTime}, ${aliasUpdatedTime}`;

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

    readByParentId(id: string | undefined): FlashcardSetGroupModel[] {
        if (id === undefined) {
            return this.database.prepare(`SELECT ${aliasAll} FROM ${tableName} WHERE flashcard_set_group_parent_id IS NULL`).all();
        }
        return this.database.prepare(`SELECT ${aliasAll} FROM ${tableName} WHERE flashcard_set_group_parent_id = ?`).all(id);
    }

    create(flashcardSetGroup: FlashcardSetGroupModel): FlashcardSetGroupModel {
        flashcardSetGroup.id = databaseUtil.newUuid();
        this.database.prepare(`INSERT INTO ${tableName} (flashcard_set_group_id, flashcard_set_group_parent_id, flashcard_set_group_name)VALUES (@id, @parentId, @name)`)
            .run(flashcardSetGroup);
        return flashcardSetGroup;
    }

    readWithChildren(id: string): FlashcardSetGroupModel {
        const rows = this.database.prepare(`
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
        `).all(id) as SelectWithChildrenRow[];

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
        return flashcardSetGroup;
    }

    update(flashcardSetGroup: FlashcardSetGroupModel): FlashcardSetGroupModel {
        this.database.prepare(`UPDATE ${tableName} SET flashcard_set_group_name = @name WHERE flashcard_set_group_id = @id`)
            .run(flashcardSetGroup);
        return flashcardSetGroup;
    }
}