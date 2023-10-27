// @ts-ignore
//import FlashcardSetModel from './FlashcardSetModel';
import /* webpackIgnore: true */ FlashcardSetModel from './FlashcardSetModel.js';

export default class FlashcardSetGroupModel {
    id?: string;
    parentId?: string;
    name: string;
    parent?: FlashcardSetGroupModel;
    childGroups?: FlashcardSetGroupModel[];
    flashcardSets?: FlashcardSetModel[];
}

