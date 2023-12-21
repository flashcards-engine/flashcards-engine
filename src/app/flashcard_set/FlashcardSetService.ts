import FlashcardSetDataAccess from "./FlashcardSetDataAccess.js";
import FlashcardSetModel from "../../common/types/FlashcardSetModel.js";
import FlashcardDataAccess from "../flashcard/FlashcardDataAccess.js";
import FlashcardSession from "../../common/types/FlashcardSession.js";
import FlashcardModel from "../../common/types/FlashcardModel.js";

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

    createSession(flashcardSetId: string): FlashcardSession {
        const flashcardSet = this.flashcardSetDataAccess.readWithFlashcards(flashcardSetId);
        if (!flashcardSet.flashcards || flashcardSet.flashcards.length === 0) {
            throw new Error('Cannot create flashcard session for flashcard set with 0 flashcards');
        }

        return {
            flashcardSetId: flashcardSet.id,
            flashcards: this.shuffleFlashcards(flashcardSet.flashcards),
        };
    }

    shuffleFlashcards(flashcards: FlashcardModel[]): FlashcardModel[] {
        let newFlashcards = [...flashcards];
        const index = Math.floor(Math.random() * flashcards.length);
        const removed = newFlashcards.splice(index, 1);
        newFlashcards = newFlashcards.length > 0 ? this.shuffleFlashcards(newFlashcards) : newFlashcards;
        return removed.concat(newFlashcards);
    }
}
