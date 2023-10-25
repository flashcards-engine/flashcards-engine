import FlashcardSetGroupDataAccess from "./FlashcardSetGroupDataAccess.js";
import FlashcardSetGroup from "./FlashcardSetGroup.js";


export default class FlashcardSetGroupService {
    flashcardSetGroupDataAccess: FlashcardSetGroupDataAccess;

    constructor(flashcardSetGroupDataAccess: FlashcardSetGroupDataAccess) {
        this.flashcardSetGroupDataAccess = flashcardSetGroupDataAccess;
    }

    async create(flashcardSetGroup: FlashcardSetGroup) {
        return this.flashcardSetGroupDataAccess.create(flashcardSetGroup);
    }
}