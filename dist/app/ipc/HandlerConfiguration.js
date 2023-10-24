import FlashcardController from '../flashcard/FlashcardController.js';
const controllers = [
    new FlashcardController()
];
export default controllers
    .reduce((accumulator, currentValue) => {
    return accumulator.concat(currentValue.getHandlerMappings());
}, []);
