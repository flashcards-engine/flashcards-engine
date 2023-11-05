import { IpcMainInvokeEvent } from 'electron';
import Controller from '../ipc/Controller.js';
import HandlerMapping from '../ipc/HandlerMapping.js';
import FlashcardService from './FlashcardService.js';
import FlashcardModel from '../../common/types/FlashcardModel.js';
import FlashcardSetService from "../flashcard_set/FlashcardSetService.js";

interface PostSingleParams {
    groupId: string;
    setId: string;
    body: FlashcardModel;
}

interface PutSingleParams {
    groupId: string;
    setId: string;
    flashcardId: string;
    body: FlashcardModel;
}

interface DeleteSingleParams {
    groupId: string;
    setId: string;
    flashcardId: string;
}

export default class FlashcardController extends Controller {
    flashcardService: FlashcardService;
    flashcardSetService: FlashcardSetService;
    
    constructor(flashcardService: FlashcardService, flashcardSetService: FlashcardSetService) {
        super();
        this.flashcardService = flashcardService;
        this.flashcardSetService = flashcardSetService;
    }

    getHandlerMappings(): HandlerMapping[] {
        return [
            {
                method: 'POST',
                route: '/flashcard-set-groups/{groupId}/flashcard-sets/{setId}/flashcards',
                handler: (event: IpcMainInvokeEvent, params: PostSingleParams) => {
                    return new Promise((resolve, reject) => {
                        const flashcardSet = this.flashcardSetService.getWithFlashcards(params.setId)
                        if (flashcardSet.groupId !== params.groupId) {
                            reject('Specified flashcard set not found under ownership of specified flashcard set group');
                        }
                        resolve(this.flashcardService.create(params.setId, params.body));
                    });
                }
            },
            {
                method: 'PUT',
                route: '/flashcard-set-groups/{groupId}/flashcard-sets/{setId}/flashcards/{flashcardId}',
                handler: (event: IpcMainInvokeEvent, params: PutSingleParams) => {
                    return new Promise((resolve, reject) => {
                        const flashcardSet = this.flashcardSetService.getWithFlashcards(params.setId)
                        if (flashcardSet.groupId !== params.groupId) {
                            reject('Specified flashcard set not found under ownership of specified flashcard set group');
                        }
                        const oldFlashcard = flashcardSet.flashcards.find((f) => f.id === params.flashcardId);
                        if (!oldFlashcard) {
                            reject('Specified flashcard not found under ownership of specified flashcard set');
                        }
                        resolve(this.flashcardService.update(params.body));
                    });
                }
            },
            {
                method: 'DELETE',
                route: '/flashcard-set-groups/{groupId}/flashcard-sets/{setId}/flashcards/{flashcardId}',
                handler: (event: IpcMainInvokeEvent, params: DeleteSingleParams) => {
                    return new Promise((resolve, reject) => {
                        const flashcardSet = this.flashcardSetService.getWithFlashcards(params.setId)
                        if (flashcardSet.groupId !== params.groupId) {
                            reject('Specified flashcard set not found under ownership of specified flashcard set group');
                        }
                        const oldFlashcard = flashcardSet.flashcards.find((f) => f.id === params.flashcardId);
                        if (!oldFlashcard) {
                            reject('Specified flashcard not found under ownership of specified flashcard set');
                        }
                        this.flashcardService.delete(params.flashcardId);
                        resolve(undefined);
                    });
                }
            },
        ];
    }
}
