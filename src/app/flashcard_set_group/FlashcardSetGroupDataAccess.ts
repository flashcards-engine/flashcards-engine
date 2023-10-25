import { Database } from 'sqlite3';
import FlashcardSetGroup from "./FlashcardSetGroup.js";

interface FlashcardSetGroupRow {
    flashcard_set_group_id: string;
    flashcard_set_group_parent_id: string;
    flashcard_set_group_name: string;
}

function mapRow(row: FlashcardSetGroupRow): FlashcardSetGroup {
    return {
        id: row.flashcard_set_group_id,
        parentId: row.flashcard_set_group_parent_id,
        name: row.flashcard_set_group_name
    }
}

const sql = {
    getRowById: 'SELECT * FROM flashcard_set_group WHERE flashcard_set_group_id = ?'
}

export default class FlashcardSetGroupDataAccess {
    database: Database;

    constructor(database: Database) {
        this.database = database;
    }

    async create(flashcardSetGroup: FlashcardSetGroup) {
        const stmt = this.database.prepare('INSERT INTO flashcard_set_group (flashcard_set_group_id, flashcard_set_group_parent_id, flashcard_set_group_name) VALUE (?, ?, ?)');
        stmt.run(flashcardSetGroup.id, flashcardSetGroup.parentId, flashcardSetGroup.name);
    }

    async read(id: string): Promise<FlashcardSetGroup> {
        return new Promise((resolve, reject) => {
            this.database.get(sql.getRowById, id, (err, row: FlashcardSetGroupRow) => {
                resolve(mapRow(row));
            })
        });
    }
}