import FlashcardSetDataAccess from "./FlashcardSetDataAccess.js";
import FlashcardSetModel from "../../common/types/FlashcardSetModel.js";
import FlashcardDataAccess from "../flashcard/FlashcardDataAccess.js";

export default class FlashcardSetService {
    flashcardSetDataAccess: FlashcardSetDataAccess;
    flashcardDataAccess: FlashcardDataAccess;

    constructor(
        flashcardSetDataAccess: FlashcardSetDataAccess,
        flashcardDataAccess: FlashcardDataAccess
    ) {
        this.flashcardSetDataAccess = flashcardSetDataAccess;
        this.flashcardDataAccess = flashcardDataAccess;
    }

    getWithFlashcards(flashcardSetId: string): FlashcardSetModel {
        return this.flashcardSetDataAccess.readWithFlashcards(flashcardSetId);
    }

    create(flashcardSetGroupId: string, flashcardSet: FlashcardSetModel): FlashcardSetModel {
        flashcardSet.groupId = flashcardSetGroupId;
        return this.flashcardSetDataAccess.create(flashcardSet);
    }

    update(flashcardSet: FlashcardSetModel): FlashcardSetModel {
        return this.flashcardSetDataAccess.update(flashcardSet);
    }
}