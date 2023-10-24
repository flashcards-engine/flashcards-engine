import { IpcMainInvokeEvent } from 'electron';
import Controller from '../ipc/Controller.js';
import HandlerMapping from '../ipc/HandlerMapping.js';
import FlashcardService from './FlashcardService.js';

export default class FlashcardController extends Controller {
    getHandlerMappings(): HandlerMapping[] {
        return [
            {
                method: 'GET',
                route: '/hello',
                handler: (event: IpcMainInvokeEvent, val: string) => {
                    console.log(val);
                }
            }
        ];
    }
}
