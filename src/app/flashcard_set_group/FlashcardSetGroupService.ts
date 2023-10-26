import FlashcardSetGroupDataAccess from "./FlashcardSetGroupDataAccess.js";
import FlashcardSetGroupModel from "./FlashcardSetGroupModel.js";


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
        return this.flashcardSetGroupDataAccess.create(flashcardSetGroup);
    }
}