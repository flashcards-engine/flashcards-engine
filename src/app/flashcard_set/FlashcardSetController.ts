import { IpcMainInvokeEvent } from 'electron';
import Controller from '../ipc/Controller.js';
import HandlerMapping from '../ipc/HandlerMapping.js';
import FlashcardSetService from "./FlashcardSetService.js";
import FlashcardSetModel from "../../common/types/FlashcardSetModel.js";

interface PostSingleParams {
    groupId: string,
    body: FlashcardSetModel;
}

interface PutSingleParams {
    groupId: string;
    setId: string;
    body: FlashcardSetModel;
}

interface PostNewSession {
    groupId: string;
    setId: string;
}

export default class FlashcardSetController extends Controller {
    flaschardSetService: FlashcardSetService;

    constructor(flashcardSetService: FlashcardSetService) {
        super();
        this.flaschardSetService = flashcardSetService;
    }
    getHandlerMappings(): HandlerMapping[] {
        return [
            {
                method: 'POST',
                route: '/flashcard-set-groups/{groupId}/flashcard-sets',
                handler: (event: IpcMainInvokeEvent, params: PostSingleParams) => {
                    return new Promise((resolve, reject) => {
                        const flashcardSet = params.body;
                        if (!flashcardSet.flashcards) {
                            flashcardSet.flashcards = [];
                        } else if (flashcardSet.flashcards.length > 0) {
                            reject('' +
                                'Cannot create flashcards with flashcard set. Must create flashcard set first,' +
                                'then create flashcards individually using the appropriate endpoint.'
                            );
                        }
                        resolve(this.flaschardSetService.create(params.groupId, params.body))
                    });
                },
            },
            {
                method: 'PUT',
                route: '/flashcard-set-groups/{groupId}/flashcard-sets/{setId}',
                handler: (event: IpcMainInvokeEvent, params: PutSingleParams) => {
                    return new Promise((resolve, reject) => {
                        resolve(this.flaschardSetService.update(params.body));
                    });
                },
            },
            {
                method: 'POST',
                route: '/flashcard-set-groups/{groupId}/flashcard-sets/{setId}/session',
                handler: (event: IpcMainInvokeEvent, params: PostNewSession) => {
                    return new Promise((resolve, reject) => {
                        resolve(this.flaschardSetService.createSession(params.setId));
                    });
                },
            },
        ];
    }
}
