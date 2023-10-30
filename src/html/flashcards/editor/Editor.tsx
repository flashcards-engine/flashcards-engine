import * as React from 'react';
import EntityType from "../../../common/types/EntityType";
import FlashcardSetGroupModel from '../../../common/types/FlashcardSetGroupModel';
import FlashcardSetModel from '../../../common/types/FlashcardSetModel';

interface EditorProps {
    activeEntity: FlashcardSetGroupModel | FlashcardSetModel | undefined;
    activeEntityType: EntityType | undefined;
}

export default function Editor({activeEntity, activeEntityType}: EditorProps) {
    return (
        <div className="flex-grow-1 flex-basis-50">
            Active Entity ID: {activeEntity?.id}<br />
            Active Entity Type: {activeEntityType}<br />
            Active Entity Name: {activeEntity?.name}
        </div>
    )
}
