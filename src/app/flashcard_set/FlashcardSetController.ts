import { IpcMainInvokeEvent } from 'electron';
import Controller from '../ipc/Controller.js';
import HandlerMapping from '../ipc/HandlerMapping.js';
import FlashcardSetService from "./FlashcardSetService.js";

export default class FlashcardSetController extends Controller {
    flaschardSetService: FlashcardSetService;

    constructor(flashcardSetService: FlashcardSetService) {
        super();
        this.flaschardSetService = flashcardSetService;
    }
    getHandlerMappings(): HandlerMapping[] {
        return [
            {
                method: 'GET',
                route: '/hello3',
                handler: (event: IpcMainInvokeEvent, val: string) => {
                    console.log(val);
                    return new Promise((res, rej) => res(val.toUpperCase()));
                }
            }
        ];
    }
}
