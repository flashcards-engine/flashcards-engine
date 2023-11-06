import FlashcardSetGroupModel from "../../common/types/FlashcardSetGroupModel.js";
import FlashcardSetGroupDataAccess from "../flashcard_set_group/FlashcardSetGroupDataAccess.js";

function createRootFlashcardSetGroup(): FlashcardSetGroupModel {
    return {
        name: 'Flashcards',
        parentId: undefined,
    };
}

export default class Initializer {
    flashcardSetGroupDataAccess: FlashcardSetGroupDataAccess;
    
    constructor(flashcardSetGroupDataAccess: FlashcardSetGroupDataAccess) {
        this.flashcardSetGroupDataAccess = flashcardSetGroupDataAccess;
    }
    
    async initialize() {
        console.info('Initializing application state...');
        
        // Create a root flashcard_set_group if it doesn't exist
        let flashcardSetGroups: FlashcardSetGroupModel[] = this.flashcardSetGroupDataAccess.readByParentId(null);
        if (flashcardSetGroups.length === 0) {
            const rootFlashcardSetGroup = createRootFlashcardSetGroup();
            console.info(`Root flashcard_set_group does not exist. Creating...`);
            this.flashcardSetGroupDataAccess.create(rootFlashcardSetGroup);
            console.info(`Root flashcard_set_group with id '${rootFlashcardSetGroup.id}' created.`);
        }
        
        console.info('Application state initialized.')
    }
}
