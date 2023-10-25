import FlashcardSetDataAccess from "./FlashcardSetDataAccess.js";
import FlashcardSetFlashcardDataAccess from "./FlashcardSetFlashcardDataAccess.js";

export default class FlashcardSetService {
    flashcardSetDataAccess: FlashcardSetDataAccess;
    flashcardSetFlashcardDataAccess: FlashcardSetFlashcardDataAccess;

    constructor(
        flashcardSetDataAccess: FlashcardSetDataAccess,
        flashcardSetFlashcardDataAccess: FlashcardSetFlashcardDataAccess
    ) {
        this.flashcardSetDataAccess = flashcardSetDataAccess;
        this.flashcardSetFlashcardDataAccess = flashcardSetFlashcardDataAccess;
    }
}