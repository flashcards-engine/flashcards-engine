import FlashcardSetModel from '../flashcard_set/FlashcardSetModel.js';

export default class FlashcardSetGroupModel {
    id?: string;
    parentId?: string;
    name: string;
    parent?: FlashcardSetGroupModel;
    children?: FlashcardSetGroupModel[];
    flashcardSets?: FlashcardSetModel[];
}

