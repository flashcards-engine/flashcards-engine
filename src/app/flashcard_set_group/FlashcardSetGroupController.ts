import { IpcMainInvokeEvent } from 'electron';
import Controller from '../ipc/Controller.js';
import HandlerMapping from '../ipc/HandlerMapping.js';
import FlashcardSetGroupService from "./FlashcardSetGroupService.js";

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
                route: '/hello2',
                handler: (event: IpcMainInvokeEvent, val: string) => {
                    console.log(val);
                    return new Promise((res, rej) => res(val.toUpperCase()));
                }
            }
        ];
    }
}