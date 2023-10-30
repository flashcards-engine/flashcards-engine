import { Database } from "sqlite3";
import FlashcardModel from "../../common/types/FlashcardModel.js";

// const dbName = 'flashcard';

// const aliasId = 'flashcard_id AS id'
// const aliasName = 'flashcard_set_id AS setId'
// const aliasParentId = 'flashcard_set_group_parent_id AS parentId'
// const aliasAll = `${aliasId}, ${aliasName}, ${aliasParentId}`;

// const sql = {
//     readRowById: `SELECT ${aliasAll} FROM ${dbName} WHERE flashcard_set_group_id = ?`,
//     readByParentId: `SELECT ${aliasAll} FROM ${dbName} WHERE flashcard_set_group_parent_id = ?`,
//     readByNullParentId: `SELECT ${aliasAll} FROM ${dbName} WHERE flashcard_set_group_parent_id IS NULL`,
//     createOne: `INSERT INTO ${dbName} (flashcard_set_group_id, flashcard_set_group_parent_id, flashcard_set_group_name) VALUES (?, ?, ?)`,
// }

export default class FlashcardDataAccess {
    database: Database;
    
    constructor(database: Database) {
        this.database = database;
    }

    // async readByGroupId(groupId: string): Promise<FlashcardSetModel[]> {
    //     return new Promise((resolve, reject) => {
    //         this.database.all(sql.readByGroupId, (err, rows: FlashcardSetModel[]) => {
    //             if (err) {
    //                 reject(err);
    //             }
    //             resolve(rows);
    //         });
    //     });
    // }
}
