import * as React from 'react';
import {useAppDispatch, useAppSelector} from "../store/hooks";
import { selectTree } from './flashcardSetGroupSlice';
import {selectActiveEntity, setActiveEntity} from "./activeEntitySlice";
import Editor from "./editor/Editor";
import EntityType from "../../common/types/EntityType";
import FlashcardSetGroupModel from "../../common/types/FlashcardSetGroupModel";
import FlashcardSetModel from "../../common/types/FlashcardSetModel";
import FlashcardSetGroup from './flashcard_library/FlashcardSetGroup';

export default function Flashcards() {
    const dispatch = useAppDispatch();

    const rootFlashcardSetGroup = useAppSelector(selectTree);
    const activeEntity = useAppSelector(selectActiveEntity);

    const setActiveEntityHandler = (
        value: FlashcardSetGroupModel | FlashcardSetModel,
        type: EntityType
    ) => {
        dispatch(setActiveEntity({value, type}));
    }

    const setDestinationFlashcardSetHandler = (
        value: FlashcardSetGroupModel | FlashcardSetModel,
        type: EntityType
    ) => {
        //
    }

    return (
        <div className="flex-container flex-column flex-grow-1">
            <main className="flex-container flex-gap-5px flex-grow-1">
                <div className="flex-basis-30 max-width-30 striped">
                    {
                        rootFlashcardSetGroup
                            ? <FlashcardSetGroup
                                flashcardSetGroup={rootFlashcardSetGroup}
                                isInitiallyOpen={true}
                                indentation={0}
                                onSelectHandler={setActiveEntityHandler}
                                selectableTypes={['FLASHCARD_SET_GROUP', 'FLASHCARD_SET']}
                                activeEntityId={activeEntity?.value?.id}
                            />
                            : null
                    }
                </div>
                <div className="flex-basis-40">
                    <Editor
                        activeEntity={activeEntity?.value}
                        activeEntityType={activeEntity?.type}
                    />
                </div>
                <div className="flex-basis-30 max-width-30 striped">
                    {/* When moving a flashcard, here is where to place the second FlashcardLibrary */}
                    {
                        rootFlashcardSetGroup
                            ? <FlashcardSetGroup
                                flashcardSetGroup={rootFlashcardSetGroup}
                                isInitiallyOpen={true}
                                indentation={0}
                                onSelectHandler={setDestinationFlashcardSetHandler}
                                selectableTypes={['FLASHCARD_SET']}
                            />
                            : null
                    }
                </div>
            </main>
            <nav className="flex-basis-52px">
                {activeEntity?.type}: {activeEntity?.value?.name}
            </nav>
        </div>
    )
}
