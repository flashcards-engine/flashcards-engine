import databaseUtil from "../util/DatabaseUtil.js";
import FlashcardSetGroupModel from "../../common/types/FlashcardSetGroupModel.js";
import FlashcardSetGroupDataAccess from "../flashcard_set_group/FlashcardSetGroupDataAccess.js";

function createRootFlashcardSetGroup(): FlashcardSetGroupModel {
    return {
        name: 'Flashcards',
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
        let flashcardSetGroups: FlashcardSetGroupModel[] = await this.flashcardSetGroupDataAccess.readByParentId(null);
        if (flashcardSetGroups && flashcardSetGroups[0] === null) {
            const rootFlashcardSetGroup = createRootFlashcardSetGroup();
            console.info(`Root flashcard_set_group does not exist. Creating...`);
            await this.flashcardSetGroupDataAccess.create(rootFlashcardSetGroup);
            console.info(`Root flashcard_set_group with id '${rootFlashcardSetGroup.id}' created.`);
        }
        
        console.info('Application state initialized.')
    }
}
