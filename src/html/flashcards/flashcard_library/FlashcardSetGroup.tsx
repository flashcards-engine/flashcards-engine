import * as React from 'react';
import {useState, MouseEvent} from "react";
import FlashcardSetGroupModel from "../../../common/types/FlashcardSetGroupModel";
import FlashcardSetModel from "../../../common/types/FlashcardSetModel";
import EntityType from "../../../common/types/EntityType";

export type OnSelectHandler = (value: FlashcardSetGroupModel | FlashcardSetModel, type: EntityType) => void;

interface Props {
    flashcardSetGroup: FlashcardSetGroupModel;
    isInitiallyOpen?: boolean;
    indentation: number;
    onSelectHandler: OnSelectHandler;
    selectableTypes: EntityType[];
    activeEntityId?: string;
}

export default function FlashcardSetGroup({flashcardSetGroup, isInitiallyOpen, indentation, onSelectHandler, selectableTypes, activeEntityId}: Props) {
    const [isOpen, setIsOpen] = useState(isInitiallyOpen || false);

    const selectFlashcardSetGroup = (event: MouseEvent) => {
        event.stopPropagation();
        if (selectableTypes.includes('FLASHCARD_SET_GROUP')) {
            onSelectHandler(flashcardSetGroup, 'FLASHCARD_SET_GROUP');
        }
    }

    const handleOpen = (event: MouseEvent) => {
        setIsOpen(!isOpen);
    }
    // Draw an arrow: right for closed, down for open

    return (
        <>
            <div
                id={flashcardSetGroup.id}
                onClick={selectFlashcardSetGroup}
                className={
                    'cursor-pointer ' +
                    (activeEntityId === flashcardSetGroup.id ? 'selected-entity' : '')
                }
            >
                {Array(indentation).fill(0).map((v, i) => (<span key={i} className="indentation"></span>))}
                {flashcardSetGroup.name}
            </div>
            {
                /* Draw child FlashcardSetGroups */
                flashcardSetGroup.childGroups && flashcardSetGroup.childGroups.length > 0 && isOpen
                    ? flashcardSetGroup.childGroups.map((childGroup =>
                        <FlashcardSetGroup
                            flashcardSetGroup={childGroup}
                            indentation={indentation + 1}
                            onSelectHandler={onSelectHandler}
                            selectableTypes={selectableTypes}
                        />
                    ))
                    : null
            }
            {
                /* Draw Flashcard Sets */
                flashcardSetGroup.flashcardSets && flashcardSetGroup.flashcardSets.length > 0 && isOpen
                    ? flashcardSetGroup.flashcardSets.map((flashcardSet) =>
                        <FlashcardSet
                            flashcardSet={flashcardSet}
                            selectableTypes={selectableTypes}
                            onSelectHandler={onSelectHandler}
                            isSelected={activeEntityId === flashcardSet.id}
                        />
                    )
                    : null
            }
        </>
    )
}

interface FlashcardSetsProps {
    flashcardSet: FlashcardSetModel;
    selectableTypes: EntityType[];
    onSelectHandler: OnSelectHandler;
    isSelected: boolean;
}

function FlashcardSet({flashcardSet, selectableTypes, onSelectHandler, isSelected}: FlashcardSetsProps) {
    const selectFlashcardSet = (event: MouseEvent) => {
        event.stopPropagation();
        if (selectableTypes.includes('FLASHCARD_SET')) {
            onSelectHandler(flashcardSet, 'FLASHCARD_SET');
        }
    }
    return (
        <>
            <div
                className={isSelected ? 'selected-entity' : ''}
                onClick={selectFlashcardSet}
            >
                {flashcardSet.name}
            </div>
        </>
    )
}
