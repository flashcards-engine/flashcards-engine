import HandlerMapping from './HandlerMapping.js';
import Controller from "./Controller.js";
import FlashcardController from '../flashcard/FlashcardController.js';

const controllers: Controller[] = [
    new FlashcardController()
];

export default controllers
    .reduce((accumulator, currentValue): HandlerMapping[] => {
        return accumulator.concat(currentValue.getHandlerMappings());
    }, []);