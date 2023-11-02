import * as React from 'react';
import {useState, MouseEvent} from "react";
import FlashcardSetGroupModel from "../../../common/types/FlashcardSetGroupModel";
import FlashcardSetModel from "../../../common/types/FlashcardSetModel";
import EntityType from "../../../common/types/EntityType";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCaretDown, faCaretRight} from "@fortawesome/free-solid-svg-icons";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import { replaceGroup } from '../flashcardSetGroupSlice';
import {selectLockInfo} from "../lockInfoSlice";

type OnSelectHandler = (value: FlashcardSetGroupModel | FlashcardSetModel, type: EntityType) => void;

interface Props {
    flashcardSetGroup: FlashcardSetGroupModel;
    isInitiallyOpen?: boolean;
    indentation?: number;
    onSelectHandler: OnSelectHandler;
    selectableTypes: EntityType[];
    activeEntityId?: string;
    highlightSelected: boolean;
}

export default function FlashcardSetGroup({
    flashcardSetGroup,
    isInitiallyOpen,
    indentation = 0,
    onSelectHandler,
    selectableTypes,
    activeEntityId,
    highlightSelected
}: Props) {
    const dispatch = useAppDispatch();
    const lockInfo = useAppSelector(selectLockInfo);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenLocked, setOpenLock] = useState(false);
    const selectFlashcardSetGroup = (event: MouseEvent) => {
        event.stopPropagation();
        if (!isOpen) {
            toggleOpen();
        }
        if (selectableTypes.includes('FLASHCARD_SET_GROUP') && !lockInfo.isLocked) {
            onSelectHandler(flashcardSetGroup, 'FLASHCARD_SET_GROUP');
        }
    }

    const toggleOpen = (event?: MouseEvent) => {
        event?.stopPropagation();
        if (isOpenLocked || lockInfo.isLocked) {
            return;
        }
        setOpenLock(true);
        if (!isOpen) {
            window.api['GET']['/flashcard-set-groups/{id}']({
                id: flashcardSetGroup.id
            }).then((flashcardSetGroup) => {
                dispatch(replaceGroup({value: flashcardSetGroup}));
                setIsOpen(true);
            }).finally(() => {
                setOpenLock(false);
            });
        } else {
            setIsOpen(false);
            setOpenLock(false);
        }
    }

    return (
        <>
            <div
                key={flashcardSetGroup.id}
                className={
                    'flex-container flex-nowrap w-max-content min-w-100 no-select ' +
                    (highlightSelected && activeEntityId === flashcardSetGroup.id ? 'selected-entity ' : '') +
                    (lockInfo.isLocked ? 'text-faded ' : 'cursor-pointer ')
                }
            >
                <div
                    className='flex-container justify-content-end pr-5px'
                    onClick={toggleOpen}
                >
                    <Indentation indentation={indentation} />
                    <div key={indentation} className="flex-container flex-basis-max-content flex-nowrap block-1rem">
                        {
                            isOpen
                                ? <FontAwesomeIcon icon={faCaretDown} />
                                : <FontAwesomeIcon icon={faCaretRight} />
                        }
                    </div>
                </div>
                <div
                    className='flex-basis-max-content flex-grow-1'
                    onClick={selectFlashcardSetGroup}
                >
                    {flashcardSetGroup.name}
                </div>
            </div>
            {
                flashcardSetGroup.childGroups && flashcardSetGroup.childGroups.length > 0 && isOpen
                    ? flashcardSetGroup.childGroups.map((childGroup =>
                        <FlashcardSetGroup
                            flashcardSetGroup={childGroup}
                            indentation={indentation + 1}
                            onSelectHandler={onSelectHandler}
                            selectableTypes={selectableTypes}
                            activeEntityId={activeEntityId}
                            highlightSelected={highlightSelected}
                        />
                    ))
                    : null
            }
            {
                flashcardSetGroup.flashcardSets && flashcardSetGroup.flashcardSets.length > 0 && isOpen
                    ? flashcardSetGroup.flashcardSets.map((flashcardSet) =>
                        <FlashcardSet
                            flashcardSet={flashcardSet}
                            selectableTypes={selectableTypes}
                            onSelectHandler={onSelectHandler}
                            isSelected={activeEntityId === flashcardSet.id}
                            highlightSelected={highlightSelected}
                            indentation={indentation + 1}
                            isLocked={lockInfo.isLocked}
                        />
                    )
                    : null
            }
        </>
    )
}

interface FlashcardSetsProps {
    flashcardSet: FlashcardSetModel;
    indentation: number;
    selectableTypes: EntityType[];
    onSelectHandler: OnSelectHandler;
    isSelected: boolean;
    highlightSelected: boolean;
    isLocked: boolean;
}

function FlashcardSet({flashcardSet, indentation, selectableTypes, onSelectHandler, isSelected, highlightSelected, isLocked}: FlashcardSetsProps) {
    const selectFlashcardSet = (event: MouseEvent) => {
        event.stopPropagation();
        if (selectableTypes.includes('FLASHCARD_SET') && !isLocked) {
            onSelectHandler(flashcardSet, 'FLASHCARD_SET');
        }
    }
    return (
        <div
            key={flashcardSet.id}
            className={
                'flex-container flex-nowrap w-max-content min-w-100 no-select ' +
                (isSelected ? 'selected-entity ' : '') +
                (isLocked ? 'text-faded ' : 'cursor-pointer ')
            }
            onClick={selectFlashcardSet}
        >
            <div className='flex-container justify-content-end cursor-pointer pr-5px'>
                <Indentation indentation={indentation} />
            </div>
            {flashcardSet.name}
        </div>
    )
}

function Indentation({indentation}: {indentation: number}) {
    const elements = Array(indentation).fill(undefined).map((e, i) =>
        <div key={i} className="block-1rem"></div>
    );
    return (
        <>{elements}</>
    )
}