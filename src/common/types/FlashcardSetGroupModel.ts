import FlashcardSetModel from './FlashcardSetModel.js';

export default class FlashcardSetGroupModel {
    id?: string;
    parentId?: string;
    name?: string;
    childGroups?: FlashcardSetGroupModel[];
    flashcardSets?: FlashcardSetModel[];
}

