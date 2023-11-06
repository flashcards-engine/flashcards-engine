import * as React from 'react';
import {MouseEvent} from "react";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import { selectTree } from './flashcardSetGroupSlice';
import {selectActiveEntity, setActiveEntity} from "./flashcardSetGroupSlice";
import Editor from "./editor/Editor";
import EntityType from "../../common/types/EntityType";
import FlashcardSetGroupModel from "../../common/types/FlashcardSetGroupModel";
import FlashcardSetModel from "../../common/types/FlashcardSetModel";
import ControlBar from "./control_bar/ControlBar";
import { useState } from 'react';
import {setLockInfo} from "./lockInfoSlice";
import FlashcardSession from "../../common/types/FlashcardSession";
import FlashcardModel from '../../common/types/FlashcardModel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

type FlashcardSide = 'PROMPT' | 'ANSWER';

interface FlashcardSessionState {
    flashcardSetId: string;
    flashcards: FlashcardModel[]
    session: FlashcardSession;
    index: number;
    side: FlashcardSide;
}

export default function Flashcards() {
    const dispatch = useAppDispatch();
    const rootFlashcardSetGroup = useAppSelector(selectTree);
    const activeEntity = useAppSelector(selectActiveEntity);
    const [activeFlashcardSession, setActiveFlashcardSession] = useState(undefined);

    let activeFlashcardText: string | undefined = undefined;
    if (activeFlashcardSession) {
        if (activeFlashcardSession.side === 'PROMPT') {
            activeFlashcardText = activeFlashcardSession.flashcards[activeFlashcardSession.index].prompt;
        } else if (activeFlashcardSession.side === 'ANSWER') {
            activeFlashcardText = activeFlashcardSession.flashcards[activeFlashcardSession.index].answer;
        }
    }

    const isSessionTriggerable = activeEntity
            && activeEntity.type === 'FLASHCARD_SET'
            && activeEntity.entity
            && (activeEntity.entity as FlashcardSetModel).flashcards
            && (activeEntity.entity as FlashcardSetModel).flashcards.length > 0;

    const setActiveEntityHandler = (
        entity: FlashcardSetGroupModel | FlashcardSetModel,
        type: EntityType
    ) => {
        dispatch(setActiveEntity({entity, type}));
    }

    const triggerFlashcardSession = (flashcardSet: FlashcardSetModel) => {
        dispatch(setLockInfo({isLocked: true}));
        window.api['POST']['/flashcard-set-groups/{groupId}/flashcard-sets/{setId}/session']({
            groupId: flashcardSet.groupId,
            setId: flashcardSet.id,
        }).then((flashcardSession) => {
            setActiveFlashcardSession({
                flashcardSetId: flashcardSession.flashcardSetId,
                flashcards: flashcardSession.flashcards,
                index: 0,
                side: 'PROMPT'
            } as FlashcardSessionState);
        }).finally(() => {
            dispatch(setLockInfo({isLocked: false}));
        });
    }

    const navigateFlashcardSession = (navigation: -1 | 1) => {
        setActiveFlashcardSession({
            ...activeFlashcardSession,
            index: activeFlashcardSession.index + navigation,
            side: 'PROMPT',
        } as FlashcardSessionState);
    }

    const flipFlashcard = () => {
        setActiveFlashcardSession({
            ...activeFlashcardSession,
            side: activeFlashcardSession.side === 'PROMPT' ? 'ANSWER' : 'PROMPT',
        } as FlashcardSessionState);
    }

    const exitSession = (event: MouseEvent) => {
        event.stopPropagation();
        setActiveFlashcardSession(undefined);
    }

    return (
        <main className="flex-container flex-column flex-grow-1">
            {
                activeFlashcardSession
                    ? <div id="flashcard" className="flex-container position-relative justify-content-center align-items-center flex-grow-1 w-100vw min-height-0">
                        <div id="exit-flashcard" onClick={exitSession}>
                            <FontAwesomeIcon icon={faXmark} />
                        </div>
                        {activeFlashcardText}
                    </div>
                    : <Editor
                        rootFlashcardSetGroup={rootFlashcardSetGroup}
                        activeEntity={activeEntity?.entity}
                        activeEntityType={activeEntity?.type}
                        activeEntityHierarchy={activeEntity?.hierarchy}
                        setActiveEntityHandler={setActiveEntityHandler}
                    />
            }
            <ControlBar
                activeFlashcardSet={activeEntity && activeEntity.type === 'FLASHCARD_SET' ? activeEntity.entity as FlashcardSetModel : undefined}
                isSessionTriggerable={isSessionTriggerable}
                isSessionActive={!!activeFlashcardSession}
                triggerFlashcardSession={triggerFlashcardSession}
                flipFlashcard={flipFlashcard}
                hasNext={activeFlashcardSession && activeFlashcardSession.index < activeFlashcardSession.flashcards.length - 1}
                hasPrevious={activeFlashcardSession && activeFlashcardSession.index !== 0}
                navigate={navigateFlashcardSession}
            />
        </main>
    )
}
