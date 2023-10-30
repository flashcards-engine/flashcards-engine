import * as React from 'react';
import Flashcards from "./flashcards/Flashcards";
import {useAppDispatch} from "./store/hooks";
import {updateGroup} from "./flashcards/flashcardSetGroupSlice";

export default function FlashcardsContainer() {
    const dispatch = useAppDispatch();
    window.api['GET']['/flashcard-set-groups']({
            parentId: null
    }).then((group) => {
        dispatch(updateGroup({value: group, groupId: undefined}));
    });

    window.api['GET']['/flashcard-set-groups/{id}']({
        id: '339c81fb-2418-4f9d-b575-206de15d2a5c'
    }).then((flashcardSetGroup) => {
        console.debug(flashcardSetGroup);
    })
    
    return <Flashcards />;
}