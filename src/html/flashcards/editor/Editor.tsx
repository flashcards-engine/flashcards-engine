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

interface EditorProps {
    activeEntity: FlashcardSetGroupModel | FlashcardSetModel | undefined;
    activeEntityType: EntityType | undefined;
}

export default function Editor({activeEntity, activeEntityType}: EditorProps) {
    const lockInfo = useAppSelector(selectLockInfo);

    return (
        <>
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
        </>
    )
}
