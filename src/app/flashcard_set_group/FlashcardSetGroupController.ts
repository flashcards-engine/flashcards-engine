import { IpcMainInvokeEvent } from 'electron';
import Controller from '../ipc/Controller.js';
import HandlerMapping from '../ipc/HandlerMapping.js';
import FlashcardSetGroupService from "./FlashcardSetGroupService.js";
import FlashcardSetGroupModel from '../../common/types/FlashcardSetGroupModel.js';

interface GetAllParams {
    parentId?: string;
    isRoot?: boolean;
}

interface PostSingleParams {
    body: FlashcardSetGroupModel;
}

interface GetSingleParams {
    id: string;
}

interface PutSingleParams {
    id: string;
    body: FlashcardSetGroupModel;
}

export default class FlashcardSetGroupController extends Controller {
    flashcardSetGroupService: FlashcardSetGroupService;
    
    constructor(flashcardSetGroupService: FlashcardSetGroupService) {
        super();
        this.flashcardSetGroupService = flashcardSetGroupService;
    }
    getHandlerMappings(): HandlerMapping[] {
        return [
            {
                method: 'GET',
                route: '/flashcard-set-groups',
                handler: (event: IpcMainInvokeEvent, params: GetAllParams) => {
                    return new Promise((resolve, reject) => {
                        resolve(this.flashcardSetGroupService.getByParentId(params.parentId));
                    });

                }
            },
            {
                method: 'POST',
                route: '/flashcard-set-groups',
                handler: (event: IpcMainInvokeEvent, params: PostSingleParams) => {
                    return new Promise((resolve, reject) => {
                        resolve(this.flashcardSetGroupService.create(params.body));
                    });
                }
            },
            {
                method: 'GET',
                route: '/flashcard-set-groups/{id}',
                handler: (event: IpcMainInvokeEvent, params: GetSingleParams) => {
                    return new Promise((resolve, reject) => {
                        resolve(this.flashcardSetGroupService.getWithChildEntities(params.id));
                    });
                }
            },
            {
                method: 'PUT',
                route: '/flashcard-set-groups/{id}',
                handler: (event: IpcMainInvokeEvent, params: PutSingleParams) => {
                    return new Promise((resolve, reject) => {
                        resolve(this.flashcardSetGroupService.update(params.body));
                    });
                }
            },
        ];
    }
}