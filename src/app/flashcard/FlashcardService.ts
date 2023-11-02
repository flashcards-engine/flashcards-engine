import FlashcardModel from "../../common/types/FlashcardModel.js";
import FlashcardDataAccess from "./FlashcardDataAccess.js";

export default class FlashcardService {
    flashcardDataAccess: FlashcardDataAccess;
    
    constructor(
        flashcardDataAccess: FlashcardDataAccess,
    ) {
        this.flashcardDataAccess = flashcardDataAccess;
    }

    update(flashcard: FlashcardModel) {
        return this.flashcardDataAccess.update(flashcard);
    }
}
