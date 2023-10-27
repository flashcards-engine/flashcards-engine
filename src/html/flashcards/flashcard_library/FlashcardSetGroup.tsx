import * as React from 'react';
import {useState, MouseEvent} from "react";
import FlashcardSetGroupModel from "../../../common/types/FlashcardSetGroupModel";
import {useAppSelector, useAppDispatch} from "../../store/hooks";
import {selectActiveEntity, setActiveEntity} from "../activeEntitySlice";
import FlashcardSetModel from "../../../common/types/FlashcardSetModel";
import EntityType from "../../../common/types/EntityType";

interface Props {
    flashcardSetGroup: FlashcardSetGroupModel;
    isInitiallyOpen?: boolean;
    indentation: number;
}

export default function FlashcardSetGroup({flashcardSetGroup, isInitiallyOpen, indentation}: Props) {
    const [isOpen, setIsOpen] = useState(isInitiallyOpen || false);
    const [isSelected, setIsSelected] = useState(false);
    // Draws an arrow: right for closed, down for open
    // Draws a row which is indented properly

    const activeEntity = useAppSelector(selectActiveEntity);
    const dispatch = useAppDispatch();


    function selectEntity(event: MouseEvent, type: EntityType, activeEntity: FlashcardSetGroupModel | FlashcardSetModel) {
        dispatch(setActiveEntity({
            type,
            value: activeEntity
        }))
    }

    return (
        <>
            <div
                id={flashcardSetGroup.id}
                onClick={(e) => selectEntity(e, 'FLASHCARD_SET_GROUP', flashcardSetGroup)}
            >
                {/* this row */}
                {flashcardSetGroup.name}
            </div>
            <ChildGroups childGroups={flashcardSetGroup.childGroups} />
            <FlashcardSets flashcardSets={flashcardSetGroup.flashcardSets} />
        </>
    )
}

interface ChildGroupsProps {
    childGroups: FlashcardSetGroupModel[];
}

function ChildGroups({childGroups}: ChildGroupsProps) {
    if (childGroups && childGroups.length > 0) {
        return (
            <>

            </>
        )
    }
    return null;
}

interface FlashcardSetsProps {
    flashcardSets: FlashcardSetModel[];
}

function FlashcardSets({flashcardSets}: FlashcardSetsProps) {
    if (flashcardSets && flashcardSets.length > 0) {
        return (
            <>

            </>
        )
    }
    return null;
}
