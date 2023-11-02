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

    getWithFlashcards(flashcardSetId: string) {
        return this.flashcardSetDataAccess.readWithFlashcards(flashcardSetId);
    }

    create(flashcardSetGroupId: string, flashcardSet: FlashcardSetModel) {
        flashcardSet.groupId = flashcardSetGroupId;
        return this.flashcardSetDataAccess.create(flashcardSet);
    }

    update(flashcardSet: FlashcardSetModel) {
        return new Promise((resolve, reject) => {
            Promise.all([
                this.flashcardSetDataAccess.update(flashcardSet),
                //flashcardSet.flashcards.map((flashcard) => this.flashcardDataAccess.update(flashcard))
            ]).then((values) => {
                resolve(values[0]);
            })
        });
    }
}