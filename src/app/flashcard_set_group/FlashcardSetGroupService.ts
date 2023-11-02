import FlashcardSetGroupDataAccess from "./FlashcardSetGroupDataAccess.js";
import FlashcardSetGroupModel from "../../common/types/FlashcardSetGroupModel.js";
import FlashcardSetDataAccess from "../flashcard_set/FlashcardSetDataAccess.js";
import FlashcardSetModel from "../../common/types/FlashcardSetModel.js";
import sortUtil from "../../common/util/SortUtil.js";


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

    async getByParentId(flashcardSetGroupParentId: string | undefined): Promise<FlashcardSetGroupModel[]> {
        return this.flashcardSetGroupDataAccess.readByParentId(flashcardSetGroupParentId);
    }

    async getWithChildEntities(flashcardSetGroupId: string): Promise<FlashcardSetGroupModel> {
        return Promise.all([
            this.flashcardSetGroupDataAccess.readWithChildren(flashcardSetGroupId),
            this.flashcardSetDataAccess.readAllByGroupIdWithFlashcards(flashcardSetGroupId)
        ]).then((value: [FlashcardSetGroupModel, FlashcardSetModel[]]) => {
            return new Promise((resolve, reject) => {
                if (value[0]) {
                    value[1].sort(sortUtil.getAscendingSort('createdTime'));
                    value[0].childGroups.sort(sortUtil.getAscendingSort('createdTime'))
                    value[0].flashcardSets = value[1];
                    resolve(value[0]);
                }
            });
        });
    }

    async create(flashcardSetGroup: FlashcardSetGroupModel): Promise<FlashcardSetGroupModel> {
        return new Promise((resolve, reject) => {
            if (!flashcardSetGroup.parentId) {
                reject('Cannot create flashcard_set_group without associated parent');
            }
            resolve(this.flashcardSetGroupDataAccess.create(flashcardSetGroup));
        });
    }

    async update(flashcardSetGroup: FlashcardSetGroupModel): Promise<FlashcardSetGroupModel> {
        return new Promise((resolve, reject) => {
            resolve(this.flashcardSetGroupDataAccess.update(flashcardSetGroup));
        });
    }
}