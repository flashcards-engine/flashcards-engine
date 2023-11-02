import * as React from 'react';
import EntityType from "../../../common/types/EntityType";
import FlashcardSetGroupModel from '../../../common/types/FlashcardSetGroupModel';
import FlashcardSetModel from '../../../common/types/FlashcardSetModel';
import FlashcardSetGroupEditor from "./FlashcardSetGroupEditor";
import FlashcardSetEditor from "./FlashcardSetEditor";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';

interface EditorProps {
    activeEntity: FlashcardSetGroupModel | FlashcardSetModel | undefined;
    activeEntityType: EntityType | undefined;
}

export default function Editor({activeEntity, activeEntityType}: EditorProps) {
    return (
        <>
            <div key={activeEntity?.id} className="flex-container flex-column flex-grow-1">
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
                {/*<FontAwesomeIcon icon={faCircleNotch} />*/}
                {/*<FontAwesomeIcon icon={faFloppyDisk} />*/}
        </>
    )
}
