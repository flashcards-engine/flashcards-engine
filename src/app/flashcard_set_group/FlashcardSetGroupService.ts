import FlashcardSetGroupDataAccess from "./FlashcardSetGroupDataAccess.js";
import FlashcardSetGroupModel from "../../common/types/FlashcardSetGroupModel.js";
import FlashcardSetDataAccess from "../flashcard_set/FlashcardSetDataAccess.js";
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

    getByParentId(flashcardSetGroupParentId: string | undefined): FlashcardSetGroupModel[] {
        return this.flashcardSetGroupDataAccess.readByParentId(flashcardSetGroupParentId || undefined);
    }

    getWithChildEntities(flashcardSetGroupId: string): FlashcardSetGroupModel | undefined {
        const flashcardSetGroup = this.flashcardSetGroupDataAccess.readWithChildren(flashcardSetGroupId);
        const flashcardSets = this.flashcardSetDataAccess.readAllByGroupIdWithFlashcards(flashcardSetGroupId);
        if (flashcardSetGroup) {
            flashcardSets.sort(sortUtil.getAscendingSort('createdTime'));
            flashcardSetGroup.childGroups.sort(sortUtil.getAscendingSort('createdTime'))
            flashcardSetGroup.flashcardSets = flashcardSets;
            return flashcardSetGroup;
        }
        return undefined;
    }

    create(flashcardSetGroup: FlashcardSetGroupModel): FlashcardSetGroupModel {
        if (!flashcardSetGroup.parentId) {
            throw new Error('Cannot create flashcard_set_group without associated parent');
        }
        return this.flashcardSetGroupDataAccess.create(flashcardSetGroup);
    }

    update(flashcardSetGroup: FlashcardSetGroupModel): FlashcardSetGroupModel {
        return this.flashcardSetGroupDataAccess.update(flashcardSetGroup);
    }
}