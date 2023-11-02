import * as React from 'react';
import {ChangeEvent, useState, MouseEvent} from "react";
import FlashcardSetGroupModel from "../../../common/types/FlashcardSetGroupModel";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {selectLockInfo, selectLockTimeout, setLockInfo} from "../lockInfoSlice";
import {appendChildGroup, appendSet, updateGroup} from '../flashcardSetGroupSlice';

interface FlashcardSetGroupEditorProps {
    flashcardSetGroup: FlashcardSetGroupModel;
}

export default function FlashcardSetGroupEditor({flashcardSetGroup}: FlashcardSetGroupEditorProps) {
    const dispatch = useAppDispatch();
    const lockInfo = useAppSelector(selectLockInfo);
    const lockTimeout = useAppSelector(selectLockTimeout);
    const [baseFlashcardSetGroup, setBaseFlashcardSetGroup] = useState({...flashcardSetGroup});
    const [workingFlashcardSetGroup, setWorkingFlashcardSetGroup] = useState({...flashcardSetGroup});
    
    const groupsAreEqual = (oldGroup: FlashcardSetGroupModel, newGroup: FlashcardSetGroupModel): boolean => {
        return oldGroup.name === newGroup.name;
    }
    
    if (!lockInfo.isLocked && !groupsAreEqual(baseFlashcardSetGroup, workingFlashcardSetGroup)) {
        dispatch(setLockInfo({isLocked: true}));
        window.api['PUT']['/flashcard-set-groups/{id}']({
            id: flashcardSetGroup.id,
            body: workingFlashcardSetGroup,
        }).then((updatedFlashcardSetGroup: FlashcardSetGroupModel) => {
            dispatch(updateGroup({value: updatedFlashcardSetGroup}));
            setBaseFlashcardSetGroup(updatedFlashcardSetGroup);
            setTimeout(() => {
                dispatch(setLockInfo({isLocked: false}));
                }, lockTimeout);
        });
    }
    
    const updateName = (event: ChangeEvent<HTMLInputElement>) => {
        if (workingFlashcardSetGroup.name === event.target.value) {
            return;
        }
        setWorkingFlashcardSetGroup({
            ...workingFlashcardSetGroup,
            name: event.target.value,
        });
    }
    
    const createSubGroup = (event: MouseEvent) => {
        event.stopPropagation();
        dispatch(setLockInfo({isLocked: true}));
        window.api['POST']['/flashcard-set-groups']({
            body: {
                parentId: baseFlashcardSetGroup.id,
                name: 'New flashcard set group',
            },
        }).then((newSubGroup) => {
            dispatch(appendChildGroup({value: newSubGroup}));
        }).finally(() => {
            dispatch(setLockInfo({isLocked: false}));
        });
    }
    
    const createFlashcardSet = (event: MouseEvent) => {
        event.stopPropagation();
        window.api['POST']['/flashcard-set-groups/{groupId}/flashcard-sets']({
            groupId: baseFlashcardSetGroup.id,
            body: {
                name: 'New flashcard set',
            },
        }).then((newSet) => {
            dispatch(appendSet({value: newSet}));
        }).finally(() => {
            dispatch(setLockInfo({isLocked: false}));
        });
    }
    
    return (
        <div className="flex-container flex-column flex-grow-1 justify-content-between min-height-0">
            <div className="overflow-scroll flex-grow-1">
                <div>Editing flashcard set group</div>
                <form className="flex-container flex-column">
                    <label>
                        Name:
                        <input
                            id="group-name"
                            name="name"
                            type="text"
                            defaultValue={flashcardSetGroup.name}
                            onChange={updateName}
                            disabled={!flashcardSetGroup.parentId}
                        ></input>
                    </label>
                </form>
            </div>
            <div className="flex-container flex-gap-5px">
                <button disabled={lockInfo.isLocked} onClick={createSubGroup}>New sub group</button>
                <button disabled={lockInfo.isLocked} onClick={createFlashcardSet}>New flashcard set</button>
            </div>
        </div>
    );
}