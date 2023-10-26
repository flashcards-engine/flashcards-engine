import { IpcMainInvokeEvent } from 'electron';
import Controller from '../ipc/Controller.js';
import HandlerMapping from '../ipc/HandlerMapping.js';
import FlashcardService from './FlashcardService.js';
import FlashcardModel from '../../common/types/FlashcardModel.js';

export default class FlashcardController extends Controller {
    flaschardService: FlashcardService;
    
    constructor(flashcardService: FlashcardService) {
        super();
        this.flaschardService = flashcardService;
    }
    getHandlerMappings(): HandlerMapping[] {
        return [
            {
                method: 'POST',
                route: '/flashcards',
                handler: (event: IpcMainInvokeEvent, flashcard: FlashcardModel) => {
//                    return this.flaschardService.create(flashcard);
                }
            }
        ];
    }
}
