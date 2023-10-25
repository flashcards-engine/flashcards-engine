import FlashcardDataAccess from "./FlashcardDataAccess.js";
import FlashcardSetFlashcardDataAccess from "../flashcard_set/FlashcardSetFlashcardDataAccess.js";

export default class FlashcardService {
    flashcardDataAccess: FlashcardDataAccess;
    flashcardSetFlashcardDataAccess: FlashcardSetFlashcardDataAccess;
    
    constructor(
        flashcardDataAccess: FlashcardDataAccess,
        flashcardSetFlashcardDataAccess: FlashcardSetFlashcardDataAccess
    ) {
        this.flashcardDataAccess = flashcardDataAccess;
        this.flashcardSetFlashcardDataAccess = flashcardSetFlashcardDataAccess;
    }
}