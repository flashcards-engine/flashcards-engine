import FlashcardModel from "./FlashcardModel.js";

export default interface FlashcardSession {
    flashcardSetId: string;
    flashcards: FlashcardModel[];
}
