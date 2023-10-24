import FlashcardDataAccess from "./FlashcardDataAccess.js";

export default class FlashcardService {
    flashcardDataAccess: FlashcardDataAccess;
    
    constructor(flashcardDataAccess: FlashcardDataAccess) {
        this.flashcardDataAccess = flashcardDataAccess;
    }
}