import * as React from 'react';
import Flashcards from "./flashcards/Flashcards";
import {useAppDispatch} from "./store/hooks";
import {replaceGroup, setActiveEntity} from "./flashcards/flashcardSetGroupSlice";
import FlashcardSetGroupModel from '../common/types/FlashcardSetGroupModel';

export default function FlashcardsContainer() {
    const dispatch = useAppDispatch();
    window.api['GET']['/flashcard-set-groups']({
            parentId: null
    }).then((groups: FlashcardSetGroupModel[]) => {
        if (groups[0]) {
            dispatch(replaceGroup({value: groups[0]}));
            dispatch(setActiveEntity({type: 'FLASHCARD_SET_GROUP', entity: groups[0]}));
        } else {
            console.error('Could not load root FlashcardSetGroup.');
            alert('Error: Could not load root FlashcardSetGroup.');
        }
    });
    
    return <Flashcards />;
}