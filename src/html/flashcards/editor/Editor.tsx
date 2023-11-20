import * as React from 'react';
import EntityType from "../../../common/types/EntityType";
import FlashcardSetGroupModel from '../../../common/types/FlashcardSetGroupModel';
import FlashcardSetModel from '../../../common/types/FlashcardSetModel';
import FlashcardSetGroupEditor from "./FlashcardSetGroupEditor";
import FlashcardSetEditor from "./FlashcardSetEditor";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import {useAppSelector} from "../../store/hooks";
import {selectLockInfo} from "../lockInfoSlice";
import FlashcardSetGroup from '../flashcard_library/FlashcardSetGroup';

type OnSelectHandler = (value: FlashcardSetGroupModel | FlashcardSetModel, type: EntityType) => void;

interface EditorProps {
    rootFlashcardSetGroup: FlashcardSetGroupModel | undefined;
    activeEntity: FlashcardSetGroupModel | FlashcardSetModel | undefined;
    activeEntityType: EntityType | undefined;
    activeEntityHierarchy: string[] | undefined;
    setActiveEntityHandler: OnSelectHandler;
}

export default function Editor({
    rootFlashcardSetGroup,
    activeEntity,
    activeEntityType,
    activeEntityHierarchy,
    setActiveEntityHandler,
}: EditorProps) {
    const lockInfo = useAppSelector(selectLockInfo);

    let flashcardSetSource: string | undefined = undefined;

    const setDestinationFlashcardSetHandler = (
        value: FlashcardSetGroupModel | FlashcardSetModel,
        type: EntityType
    ) => {
        //
    }

    return (
        <div className="flex-container flex-grow-1 w-100vw min-height-0">
            <div className="flex-basis-30 overflow-scroll striped border-right">
                {
                    rootFlashcardSetGroup
                        ? <FlashcardSetGroup
                            flashcardSetGroup={rootFlashcardSetGroup}
                            isInitiallyOpen={true}
                            onSelectHandler={setActiveEntityHandler}
                            selectableTypes={['FLASHCARD_SET_GROUP', 'FLASHCARD_SET']}
                            activeEntityId={activeEntity?.id}
                            activeEntityHierarchy={activeEntityHierarchy}
                            highlightSelected={true}
                        />
                        : null
                }
            </div>
            <div className="flex-container flex-basis-40 flex-grow-1">
                <div key={activeEntity?.id} className="flex-container flex-column flex-grow-1 position-relative">
                    <div id="editor-status-icon" title={lockInfo.isLocked ? 'Updating...' : 'Up to date'}>
                        {
                            lockInfo.isLocked
                                ? <FontAwesomeIcon spin={true} icon={faCircleNotch} />
                                : <FontAwesomeIcon icon={faFloppyDisk} />
                        }
                    </div>
                    {
                        activeEntityType && activeEntityType === 'FLASHCARD_SET_GROUP'
                            ? <FlashcardSetGroupEditor
                                flashcardSetGroup={activeEntity as FlashcardSetGroupModel}
                            />
                            : null
                    }
                    {
                        activeEntityType && activeEntityType === 'FLASHCARD_SET'
                            ? <FlashcardSetEditor
                                flashcardSet={activeEntity as FlashcardSetModel}
                            />
                            : null
                    }
                </div>
            </div>
                {
                    rootFlashcardSetGroup && flashcardSetSource
                        ? <div className="flex-basis-30 overflow-scroll striped border-left">
                            <FlashcardSetGroup
                                flashcardSetGroup={rootFlashcardSetGroup}
                                isInitiallyOpen={true}
                                activeEntityId={activeEntity?.id}
                                onSelectHandler={setDestinationFlashcardSetHandler}
                                selectableTypes={['FLASHCARD_SET']}
                                highlightSelected={false}
                            />
                        </div>
                        : null
                }
        </div>
    )
}
