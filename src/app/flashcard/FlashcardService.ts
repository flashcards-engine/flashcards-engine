import FlashcardModel from "../../common/types/FlashcardModel.js";
import FlashcardDataAccess from "./FlashcardDataAccess.js";

export default class FlashcardService {
    flashcardDataAccess: FlashcardDataAccess;
    
    constructor(
        flashcardDataAccess: FlashcardDataAccess,
    ) {
        this.flashcardDataAccess = flashcardDataAccess;
    }

    create(flashcardSetId: string, flashcardModel: FlashcardModel): FlashcardModel {
        return this.flashcardDataAccess.create(flashcardSetId, flashcardModel);
    }

    update(flashcard: FlashcardModel): FlashcardModel {
        return this.flashcardDataAccess.update(flashcard);
    }

    delete(flashcardId: string) {
        this.flashcardDataAccess.delete(flashcardId);
    }
}
