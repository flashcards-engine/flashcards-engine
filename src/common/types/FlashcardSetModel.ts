import FlashcardModel from "./FlashcardModel.js";

export default interface FlashcardSetModel {
    id?: string;
    groupId?: string;
    name?: string;
    flashcards?: FlashcardModel[];
}