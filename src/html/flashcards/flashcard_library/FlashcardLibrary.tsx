import * as React from 'react';
import FlashcardSetGroup from "./FlashcardSetGroup";
import {useAppSelector} from "../../store/hooks";
import {selectTree} from "../flashcardSetGroupSlice";

export default function FlashcardLibrary() {
    const rootFlashcardSetGroup = useAppSelector(selectTree);

    return (
        <div>
            {
                rootFlashcardSetGroup
                    ? <FlashcardSetGroup
                        flashcardSetGroup={rootFlashcardSetGroup}
                        isInitiallyOpen={true}
                        indentation={0}
                    />
                    : null
            }
        </div>
    )
}