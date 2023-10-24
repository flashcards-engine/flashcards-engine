import HandlerMapping from './HandlerMapping.js';

export default abstract class Controller {
    abstract getHandlerMappings(): HandlerMapping[];
}
