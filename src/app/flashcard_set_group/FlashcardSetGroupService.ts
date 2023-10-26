import FlashcardSetGroupDataAccess from "./FlashcardSetGroupDataAccess.js";
import FlashcardSetGroupModel from "../../common/types/FlashcardSetGroupModel.js";


export default class FlashcardSetGroupService {
    flashcardSetGroupDataAccess: FlashcardSetGroupDataAccess;

    constructor(flashcardSetGroupDataAccess: FlashcardSetGroupDataAccess) {
        this.flashcardSetGroupDataAccess = flashcardSetGroupDataAccess;
    }

    async getByParentId(flashcardSetGroupParentId?: string) {
        return this.flashcardSetGroupDataAccess.readByParentId(flashcardSetGroupParentId);
    }

    async get(flashcardSetGroupId: string) {
        return this.flashcardSetGroupDataAccess.read(flashcardSetGroupId);
    }

    async getByName(flashcardSetGroupName: string): Promise<FlashcardSetGroupModel> {
        return this.flashcardSetGroupDataAccess.readByName(flashcardSetGroupName);
    }

    async create(flashcardSetGroup: FlashcardSetGroupModel) {
        return new Promise((resolve, reject) => {
            if (!flashcardSetGroup.parentId) {
                reject('Cannot create flashcard_set_group without associated parent');
            }
            resolve(this.flashcardSetGroupDataAccess.create(flashcardSetGroup));
        });
    }
}