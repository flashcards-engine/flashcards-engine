import Controller from '../ipc/Controller.js';
export default class FlashcardController extends Controller {
    getHandlerMappings() {
        return [
            {
                method: 'GET',
                route: '/hello',
                handler: (event, val) => {
                    console.log(val);
                }
            }
        ];
    }
}
