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
                    return this.flaschardSetService.create(params.groupId, params.body);
                },
            },
            {
                method: 'PUT',
                route: '/flashcard-set-groups/{groupId}/flashcard-sets/{setId}',
                handler: (event: IpcMainInvokeEvent, params: PutSingleParams) => {
                    return this.flaschardSetService.update(params.body);
                },
            }
        ];
    }
}
