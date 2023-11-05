import * as React from 'react';
import FlashcardSetModel from "../../../common/types/FlashcardSetModel";
import {faPlay} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface ControlBarProps {
    activeEntity: FlashcardSetModel | undefined;
}

export default function ControlBar({
    activeEntity,
}: ControlBarProps) {

    return (
        <nav className={
            'control-bar border-top flex-container justify-content-center align-items-center ' +
            (activeEntity ? 'cursor-pointer' : 'faded')
        }>
            <FontAwesomeIcon icon={faPlay} />
        </nav>
    )
}