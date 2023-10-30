import FlashcardSetGroupDataAccess from "./FlashcardSetGroupDataAccess.js";
import FlashcardSetGroupModel from "../../common/types/FlashcardSetGroupModel.js";
import FlashcardSetDataAccess from "../flashcard_set/FlashcardSetDataAccess.js";
import FlashcardSetModel from "../../common/types/FlashcardSetModel.js";


export default class FlashcardSetGroupService {
    flashcardSetGroupDataAccess: FlashcardSetGroupDataAccess;
    flashcardSetDataAccess: FlashcardSetDataAccess;

    constructor(
        flashcardSetGroupDataAccess: FlashcardSetGroupDataAccess,
        flashcardSetDataAccess: FlashcardSetDataAccess
    ) {
        this.flashcardSetGroupDataAccess = flashcardSetGroupDataAccess;
        this.flashcardSetDataAccess = flashcardSetDataAccess;
    }

    async getByParentId(flashcardSetGroupParentId?: string) {
        return this.flashcardSetGroupDataAccess.readByParentId(flashcardSetGroupParentId);
    }

    async getWithChildEntities(flashcardSetGroupId: string) {
        return Promise.all([
            this.flashcardSetGroupDataAccess.readWithChildren(flashcardSetGroupId),
            this.flashcardSetDataAccess.readAllByGroupIdWithFlashcards(flashcardSetGroupId)
        ]).then((value) => {
            return new Promise((resolve, reject) => {
                if (value[0]) {
                    value[0].flashcardSets = value[1];
                    resolve(value[0]);
                }
            });
        });
    }

    async create(flashcardSetGroup: FlashcardSetGroupModel) {
        return new Promise((resolve, reject) => {
            if (!flashcardSetGroup.parentId) {
                reject('Cannot create flashcard_set_group without associated parent');
            }
            resolve(this.flashcardSetGroupDataAccess.create(flashcardSetGroup));
        });
    }
}