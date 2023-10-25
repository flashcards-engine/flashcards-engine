import { Database } from 'sqlite3';
import FlashcardSetGroupDataAccess from "../flashcard_set_group/FlashcardSetGroupDataAccess.js";
import FlashcardSetDataAccess from '../flashcard_set/FlashcardSetDataAccess.js';
import FlashcardDataAccess from '../flashcard/FlashcardDataAccess.js';
import FlashcardSetFlashcardDataAccess from '../flashcard_set/FlashcardSetFlashcardDataAccess.js';
import FlashcardSetGroupService from "../flashcard_set_group/FlashcardSetGroupService.js";
import FlashcardSetService from '../flashcard_set/FlashcardSetService.js';
import FlashcardService from "../flashcard/FlashcardService.js";
import FlashcardSetGroupController from '../flashcard_set_group/FlashcardSetGroupController.js';
import FlashcardSetController from '../flashcard_set/FlashcardSetController.js';
import FlashcardController from "../flashcard/FlashcardController.js";

export interface Objects {
    [key: string]: any;
}
let objects: Objects;

export default {
    configure(
        database: Database
    ): typeof this {
        if (!objects) {
            const daos = {
                flashcardSetGroupDataAccess: new FlashcardSetGroupDataAccess(database),
                flashcardSetDataAccess: new FlashcardSetDataAccess(database),
                flashcardDataAccess: new FlashcardDataAccess(database),
                flashcardSetFlashcardDataAccess: new FlashcardSetFlashcardDataAccess(database),
            };
            
            const services = {
                flashcardSetGroupService: new FlashcardSetGroupService(
                    daos.flashcardSetGroupDataAccess
                ),
                flashcardSetService: new FlashcardSetService(
                    daos.flashcardSetDataAccess,
                    daos.flashcardSetFlashcardDataAccess
                ),
                flashcardService: new FlashcardService(
                    daos.flashcardDataAccess,
                    daos.flashcardSetFlashcardDataAccess
                ),
            };
            
            const controllers = {
                flashcardSetGroupController: new FlashcardSetGroupController(services.flashcardSetGroupService),
                flashcardSetController: new FlashcardSetController(services.flashcardSetService),
                flashcardController: new FlashcardController(services.flashcardService),
            };

            objects = {...daos, ...services, ...controllers };
        }
        return this;
    },
    
    getObjects(): Objects {
        if (!objects) {
            throw new ReferenceError('Cannot access application objects without configuring them first. Did you forget to call configure(...)?')
        }
        return objects;
    }
}