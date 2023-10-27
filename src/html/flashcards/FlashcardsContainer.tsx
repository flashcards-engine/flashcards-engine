import * as React from 'react';
import {useAppDispatch, useAppSelector} from "../store/hooks";
import { updateGroup, selectTree } from './flashcardSetGroupSlice';
import FlashcardLibrary from './flashcard_library/FlashcardLibrary';
import Editor from "./editor/Editor";

export default function FlashcardsContainer() {
    const dispatch = useAppDispatch();
    window.api['GET']['/flashcard-set-groups'](
        {
            parentId: null
        }
    ).then((group) => {
        dispatch(updateGroup({value: group, groupId: undefined}));
    });
    
    return (
        <div>
            <FlashcardLibrary />
            <Editor />
        </div>
    )
}
