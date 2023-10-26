import { IpcMainInvokeEvent } from 'electron';
import Controller from '../ipc/Controller.js';
import HandlerMapping from '../ipc/HandlerMapping.js';
import FlashcardSetGroupService from "./FlashcardSetGroupService.js";

interface GetAllQueryParams {
    parentId?: string;
}

export default class FlashcardSetGroupController extends Controller {
    flaschardSetGroupService: FlashcardSetGroupService;
    
    constructor(flashcardSetGroupService: FlashcardSetGroupService) {
        super();
        this.flaschardSetGroupService = flashcardSetGroupService;
    }
    getHandlerMappings(): HandlerMapping[] {
        return [
            {
                method: 'GET',
                route: '/flashcard-set-groups',
                handler: (event: IpcMainInvokeEvent, query: GetAllQueryParams) => {
                    if (query.hasOwnProperty('parentId')) {
                        return this.flaschardSetGroupService.getByParentId(query.parentId);
                    }
                }
            }
        ];
    }
}