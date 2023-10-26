import FlashcardSetGroupService from "../flashcard_set_group/FlashcardSetGroupService.js";
import databaseUtil from "../util/DatabaseUtil.js";
import FlashcardSetGroupModel from "../flashcard_set_group/FlashcardSetGroupModel.js";

function createRootFlashcardSetGroup(): FlashcardSetGroupModel {
    return {
        name: 'Flashcards',
    };
}

export default class Initializer {
    flashcardSetGroupService: FlashcardSetGroupService;
    
    constructor(flashcardSetGroupService: FlashcardSetGroupService) {
        this.flashcardSetGroupService = flashcardSetGroupService;
    }
    
    async initialize() {
        console.info('Initializing application state...');
        
        // Create a root flashcard_set_group if it doesn't exist
        let rootFlashcardSetGroup: FlashcardSetGroupModel = await this.flashcardSetGroupService.getByParentId(null);
        if (rootFlashcardSetGroup === null) {
            rootFlashcardSetGroup = createRootFlashcardSetGroup();
            console.info(`Root flashcard_set_group does not exist. Creating...`);
            await this.flashcardSetGroupService.create(rootFlashcardSetGroup);
            console.info(`Root flashcard_set_group with id '${rootFlashcardSetGroup.id}' created.`);
            databaseUtil.setRootUuid(rootFlashcardSetGroup.id);
        }
        
        console.info('Application state initialized.')
    }
}
