import * as React from 'react';
import {MouseEvent} from "react";
import FlashcardSetModel from "../../../common/types/FlashcardSetModel";
import {faLeftLong, faPlay, faRightLong, faRotate} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useAppSelector} from "../../store/hooks";
import {selectLockInfo} from "../lockInfoSlice";

interface ControlBarProps {
    activeFlashcardSet: FlashcardSetModel | undefined;
    isSessionTriggerable: boolean;
    isSessionActive: boolean;
    triggerFlashcardSession: (flashcardSet: FlashcardSetModel) => void;
    flipFlashcard: () => void;
    hasPrevious: boolean | undefined;
    hasNext: boolean | undefined;
    navigate: (navigation: -1 | 1) => void
}

export default function ControlBar({
    activeFlashcardSet,
    isSessionTriggerable,
    isSessionActive,
    triggerFlashcardSession,
    flipFlashcard,
    hasNext,
    hasPrevious,
    navigate,
}: ControlBarProps) {
    const lockInfo = useAppSelector(selectLockInfo);

    const startFlashcardSession = (event: MouseEvent) => {
        event.stopPropagation();
        if (!lockInfo.isLocked && activeFlashcardSet) {
            triggerFlashcardSession(activeFlashcardSet);
        }
    }

    const flipCard = (event: MouseEvent) => {
        event.stopPropagation();
        flipFlashcard();
    }

    const previousCard = (event: MouseEvent) => {
        event.stopPropagation();
        if (hasPrevious) {
            navigate(-1);
        }
    }

    const nextCard = (event: MouseEvent) => {
        event.stopPropagation();
        if (hasNext) {
            navigate(1);
        }
    }

    return (
        <nav id="control-bar" className="control-bar border-top flex-gap-20px flex-container justify-content-center align-items-center">
            <div className='control-options'>
                <div
                    id="previous"
                    className={'flex-container align-items-center justify-content-center control-icon ' + (!lockInfo.isLocked && isSessionActive && hasPrevious ? 'cursor-pointer' : 'faded')}
                    onClick={previousCard}
                    title="Previous flashcard"
                >
                    <FontAwesomeIcon icon={faLeftLong} />
                </div>
            </div>
            <div className="control-options">
                {
                    isSessionActive
                        ? <div
                            id="flip"
                            className='flex-container align-items-center justify-content-center control-icon cursor-pointer'
                            onClick={flipCard}
                            title="Flip flashcard"
                        >
                            <FontAwesomeIcon icon={faRotate} />
                        </div>
                        : <div
                            id="play"
                            className={'flex-container align-items-center justify-content-center control-icon ' + (!lockInfo.isLocked && isSessionTriggerable ? 'cursor-pointer' : 'faded')}
                            onClick={startFlashcardSession}
                            title="Start flashcard session"
                        >
                            <FontAwesomeIcon icon={faPlay} />
                        </div>
                }
            </div>
            <div className='control-options'>
                <div
                    id="next"
                    className={'flex-container align-items-center justify-content-center control-icon ' + (!lockInfo.isLocked && isSessionActive && hasNext ? 'cursor-pointer' : 'faded')}
                    onClick={nextCard}
                    title="Next flashcard"
                >
                    <FontAwesomeIcon icon={faRightLong} />
                </div>
            </div>
        </nav>
    )
}
