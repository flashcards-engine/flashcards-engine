import * as React from 'react';
import {ChangeEvent, useState, MouseEvent} from "react";
import FlashcardSetGroupModel from "../../../common/types/FlashcardSetGroupModel";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {selectLockInfo, selectLockTimeout, setLockInfo} from "../lockInfoSlice";
import {appendChildGroup, appendSet, updateGroup} from '../flashcardSetGroupSlice';
import {setActiveEntity} from "../activeEntitySlice";

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
        setTimeout(() => {
            window.api['PUT']['/flashcard-set-groups/{id}']({
                id: flashcardSetGroup.id,
                body: workingFlashcardSetGroup,
            }).then((updatedFlashcardSetGroup: FlashcardSetGroupModel) => {
                dispatch(updateGroup({value: updatedFlashcardSetGroup}));
                setBaseFlashcardSetGroup(updatedFlashcardSetGroup);
                dispatch(setActiveEntity({type: 'FLASHCARD_SET_GROUP', value: updatedFlashcardSetGroup}));
            }).finally(() => {
                dispatch(setLockInfo({isLocked: false}));
            });
        }, lockTimeout);
    }
    
    const updateNameHandler = (event: ChangeEvent<HTMLInputElement>) => {
        if (workingFlashcardSetGroup.name === event.target.value) {
            return;
        }
        setWorkingFlashcardSetGroup({
            ...workingFlashcardSetGroup,
            name: event.target.value,
        });
    }
    
    const addSubGroupHandler = (event: MouseEvent) => {
        event.stopPropagation();
        dispatch(setLockInfo({isLocked: true}));
        window.api['POST']['/flashcard-set-groups']({
            body: {
                parentId: baseFlashcardSetGroup.id,
                name: 'New flashcard set group',
            },
        }).then((newSubGroup) => {
            dispatch(appendChildGroup({value: newSubGroup}));
            const newBaseFlashcardSetGroup = {
                ...baseFlashcardSetGroup,
                childGroups: [...baseFlashcardSetGroup.childGroups, newSubGroup],
            }
            setBaseFlashcardSetGroup(newBaseFlashcardSetGroup);
            dispatch(setActiveEntity({type: 'FLASHCARD_SET_GROUP', value: newBaseFlashcardSetGroup}));
        }).finally(() => {
            dispatch(setLockInfo({isLocked: false}));
        });
    }
    
    const addFlashcardSetHandler = (event: MouseEvent) => {
        event.stopPropagation();
        window.api['POST']['/flashcard-set-groups/{groupId}/flashcard-sets']({
            groupId: baseFlashcardSetGroup.id,
            body: {
                name: 'New flashcard set',
            },
        }).then((newSet) => {
            dispatch(appendSet({value: newSet}));
            const newBaseFlashcardSetGroup = {
                ...baseFlashcardSetGroup,
                flashcardSets: [...baseFlashcardSetGroup.flashcardSets, newSet],
            }
            setBaseFlashcardSetGroup(newBaseFlashcardSetGroup);
            dispatch(setActiveEntity({type: 'FLASHCARD_SET_GROUP', value: newBaseFlashcardSetGroup}));
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
                            onChange={updateNameHandler}
                            disabled={!flashcardSetGroup.parentId}
                        ></input>
                    </label>
                </form>
            </div>
            <div className="flex-container flex-gap-5px">
                <button disabled={lockInfo.isLocked} onClick={addSubGroupHandler}>New sub group</button>
                <button disabled={lockInfo.isLocked} onClick={addFlashcardSetHandler}>New flashcard set</button>
            </div>
        </div>
    );
}