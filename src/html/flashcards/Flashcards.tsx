import * as React from 'react';
import {useAppDispatch, useAppSelector} from "../store/hooks";
import { selectTree, replaceGroup } from './flashcardSetGroupSlice';
import {selectActiveEntity, setActiveEntity} from "./activeEntitySlice";
import Editor from "./editor/Editor";
import EntityType from "../../common/types/EntityType";
import FlashcardSetGroupModel from "../../common/types/FlashcardSetGroupModel";
import FlashcardSetModel from "../../common/types/FlashcardSetModel";
import FlashcardSetGroup from './flashcard_library/FlashcardSetGroup';
import ControlBar from "./control_bar/ControlBar";

export default function Flashcards() {
    const dispatch = useAppDispatch();
    const rootFlashcardSetGroup = useAppSelector(selectTree);
    const activeEntity = useAppSelector(selectActiveEntity);

    let flashcardSetSource: string | undefined = undefined;

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
            <main className="flex-container flex-grow-1 w-100vw min-height-0">
                <div className="flex-basis-30 overflow-scroll striped border-right">
                    {
                        rootFlashcardSetGroup
                            ? <FlashcardSetGroup
                            flashcardSetGroup={rootFlashcardSetGroup}
                            isInitiallyOpen={true}
                            onSelectHandler={setActiveEntityHandler}
                            selectableTypes={['FLASHCARD_SET_GROUP', 'FLASHCARD_SET']}
                            activeEntityId={activeEntity?.value?.id}
                            highlightSelected={true}
                />
                            : null
                    }
                </div>
                <div className="flex-container flex-basis-40 flex-grow-1">
                    <Editor
                        activeEntity={activeEntity?.value}
                        activeEntityType={activeEntity?.type}
                    />
                </div>
                {
                    rootFlashcardSetGroup && flashcardSetSource
                        ? <div className="flex-basis-30 overflow-scroll striped border-left">
                        <FlashcardSetGroup
                            flashcardSetGroup={rootFlashcardSetGroup}
                            isInitiallyOpen={true}
                            onSelectHandler={setDestinationFlashcardSetHandler}
                            selectableTypes={['FLASHCARD_SET']}
                            highlightSelected={false}
                        />
            </div>
                        : null
                }
            </main>
            <ControlBar activeEntity={activeEntity && activeEntity.type === 'FLASHCARD_SET' ? activeEntity as FlashcardSetModel : undefined} />
        </div>
    )
}
