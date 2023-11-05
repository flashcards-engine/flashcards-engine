import * as React from 'react';
import FlashcardSetModel from "../../../common/types/FlashcardSetModel";
import {ChangeEvent, MouseEvent, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {
    selectLockInfo,
    selectLockTimeout,
    setLockInfo
} from "../lockInfoSlice";
import {updateSet, updateFlashcard, deleteFlashcard, appendFlashcard} from "../flashcardSetGroupSlice";
import FlashcardModel from '../../../common/types/FlashcardModel';
import {selectActiveEntity, setActiveEntity} from "../activeEntitySlice";

interface FlashcardSetEditorProps {
    flashcardSet: FlashcardSetModel;
}

export default function FlashcardSetEditor({flashcardSet}: FlashcardSetEditorProps) {
    const dispatch = useAppDispatch();
    const lockInfo = useAppSelector(selectLockInfo);
    const lockTimeout = useAppSelector(selectLockTimeout);
    const [baseFlashcardSet, setBaseFlashcardSet] = useState({...flashcardSet});
    const [workingFlashcardSet, setWorkingFlashcardSet] = useState({...flashcardSet});

    const getChangedFlashcardSetField = (): string | undefined => {
        let fieldName: string | undefined;
        if (baseFlashcardSet.name !== workingFlashcardSet.name) {
            fieldName = 'name';
        }
        return fieldName ? fieldName : undefined;
    }
    
    const getChangedFlashcardField = (): [flashcard?: FlashcardModel, flashcardField?: string] | undefined => {
        const baseFlashcardMap: {[key: string]: FlashcardModel} = baseFlashcardSet.flashcards.reduce((map, flashcard) =>
            ({...map, [flashcard.id]: flashcard}), {}) as {[key: string]: FlashcardModel};
        const workingFlashcardMap: {[key: string]: FlashcardModel} = workingFlashcardSet.flashcards.reduce((map, flashcard) =>
            ({...map, [flashcard.id]: flashcard}), {}) as {[key: string]: FlashcardModel};
        for (let flashcardId of Object.keys(baseFlashcardMap)) {
            if (workingFlashcardMap[flashcardId].prompt) {
                let fieldChanged: string | undefined;
                if (baseFlashcardMap[flashcardId].prompt !== workingFlashcardMap[flashcardId].prompt) {
                    fieldChanged = 'prompt';
                } else if (baseFlashcardMap[flashcardId].answer !== workingFlashcardMap[flashcardId].answer) {
                    fieldChanged = 'answer';
                }
                if (fieldChanged) {
                    return [workingFlashcardMap[flashcardId], fieldChanged];
                }
            }
        }
        return [undefined, undefined];
    }
    
    const changedFlashcardSetField = getChangedFlashcardSetField();
    if (!lockInfo.isLocked && changedFlashcardSetField) {
        dispatch(setLockInfo({
            isLocked: true,
            activeId: baseFlashcardSet.id,
            activeField: changedFlashcardSetField,
        }));
        
        setTimeout(() => {
            window.api['PUT']['/flashcard-set-groups/{groupId}/flashcard-sets/{setId}']({
                groupId: flashcardSet.groupId,
                setId: flashcardSet.id,
                body: workingFlashcardSet,
            }).then((updatedFlashcardSet) => {
                dispatch(updateSet({value: updatedFlashcardSet}));
                const newBaseFlashcardSet = {
                    ...baseFlashcardSet,
                    flashcards: [...baseFlashcardSet.flashcards],
                };
                newBaseFlashcardSet.name = updatedFlashcardSet.name;
                setBaseFlashcardSet(newBaseFlashcardSet);
                dispatch(setActiveEntity({type: 'FLASHCARD_SET', value: newBaseFlashcardSet}));
            }).finally(() => {
                dispatch(setLockInfo({isLocked: false}));
            });
        }, lockTimeout);
        
    } else if (!lockInfo.isLocked) {
        const [changedFlashcard, changedFlashcardField] = getChangedFlashcardField();
        if (changedFlashcard) {
            dispatch(setLockInfo({
                isLocked: true,
                activeId: changedFlashcard.id,
                activeField: changedFlashcardField,
            }));
            
            setTimeout(() => {
                window.api['PUT']['/flashcard-set-groups/{groupId}/flashcard-sets/{setId}/flashcards/{flashcardId}']({
                    groupId: baseFlashcardSet.groupId,
                    setId: baseFlashcardSet.id,
                    flashcardId: changedFlashcard.id,
                    body: changedFlashcard,
                }).then((updatedFlashcard) => {
                    dispatch(updateFlashcard({
                        value: updatedFlashcard,
                        groupId: baseFlashcardSet.groupId,
                        setId: baseFlashcardSet.id,
                    }));

                    const newBaseFlashcardSet = {
                        ...baseFlashcardSet,
                        flashcards: [...baseFlashcardSet.flashcards],
                    }
                    const flashcardIndex = newBaseFlashcardSet.flashcards.findIndex((flashcard) => flashcard.id === updatedFlashcard.id);
                    newBaseFlashcardSet.flashcards[flashcardIndex] = updatedFlashcard;
                    setBaseFlashcardSet(newBaseFlashcardSet);
                    dispatch(setActiveEntity({type: 'FLASHCARD_SET', value: newBaseFlashcardSet}));
                }).finally(() => {
                    dispatch(setLockInfo({isLocked: false}));
                });
            }, lockTimeout);
        }
    }
    
    const updateNameHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setWorkingFlashcardSet({
            ...workingFlashcardSet,
            name: event.target.value,
        });
    }
    
    const updateFlashcardHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const flashcardId = event.currentTarget.getAttribute('data-flashcard-id');
        const fieldName = event.currentTarget.getAttribute('data-field-name');
        const newFlashcards = [...workingFlashcardSet.flashcards];
        const flashcardIndex = newFlashcards.findIndex((flashcard) => flashcard.id === flashcardId);
        const newFlashcard = {...workingFlashcardSet.flashcards[flashcardIndex]};
        
        switch (fieldName) {
            case 'prompt':
                newFlashcard.prompt = event.currentTarget.value;
                break;
            case 'answer':
                newFlashcard.answer = event.currentTarget.value;
                break;
        }
        newFlashcards[flashcardIndex] = newFlashcard;
        
        setWorkingFlashcardSet({
            ...workingFlashcardSet,
            flashcards: newFlashcards
        });
    }
    
    const addFlashcardHandler = (event: MouseEvent) => {
        dispatch(setLockInfo({isLocked: true}));
        window.api['POST']['/flashcard-set-groups/{groupId}/flashcard-sets/{setId}/flashcards']({
            groupId: baseFlashcardSet.groupId,
            setId: baseFlashcardSet.id,
            body: {
                prompt: '',
                answer: '',
            }
        }).then((flashcard) => {
            dispatch(appendFlashcard({
                groupId: baseFlashcardSet.groupId,
                setId: baseFlashcardSet.id,
                value: flashcard,
            }));
            const newBaseFlashcardSet = {
                ...baseFlashcardSet,
                flashcards: [...baseFlashcardSet.flashcards, flashcard],
            };
            const newWorkingFlashcardSet = {
                ...workingFlashcardSet,
                flashcards: [...workingFlashcardSet.flashcards, flashcard],
            };
            setBaseFlashcardSet(newBaseFlashcardSet);
            setWorkingFlashcardSet(newWorkingFlashcardSet);
            dispatch(setActiveEntity({type: 'FLASHCARD_SET', value: newBaseFlashcardSet}));
        }).finally(() => {
            dispatch(setLockInfo({isLocked: false}));
        })
    }
    
    const deleteFlashcardHandler = (event: MouseEvent) => {
        const flashcardId = event.currentTarget.getAttribute('data-flashcard-id');
        dispatch(setLockInfo({isLocked: true}));
        window.api['DELETE']['/flashcard-set-groups/{groupId}/flashcard-sets/{setId}/flashcards/{flashcardId}']({
            groupId: baseFlashcardSet.groupId,
            setId: baseFlashcardSet.id,
            flashcardId: flashcardId,
        }).then(() => {
            dispatch(deleteFlashcard({
                value: flashcardId,
                groupId: baseFlashcardSet.groupId,
                setId: baseFlashcardSet.id,
            }));

            const baseFlashcardIndex = baseFlashcardSet.flashcards.findIndex((flashcard) => flashcard.id === flashcardId);
            const newBaseFlashcardSet = {
                ...baseFlashcardSet,
                flashcards: [...baseFlashcardSet.flashcards],
            }
            newBaseFlashcardSet.flashcards.splice(baseFlashcardIndex, 1);

            const workingFlashcardIndex = workingFlashcardSet.flashcards.findIndex((flashcard) => flashcard.id === flashcardId);
            const newWorkingFlashcardSet = {
                ...workingFlashcardSet,
                flashcards: [...workingFlashcardSet.flashcards],
            }
            newWorkingFlashcardSet.flashcards.splice(workingFlashcardIndex, 1);
            setBaseFlashcardSet(newBaseFlashcardSet);
            setWorkingFlashcardSet(newWorkingFlashcardSet);
            dispatch(setActiveEntity({type: 'FLASHCARD_SET', value: newBaseFlashcardSet}));
        }).finally(() => {
            dispatch(setLockInfo({isLocked: false}));
        });
    }
    
    const promptId = (flashcard: FlashcardModel) => `${flashcard.id}-prompt`;
    const answerId = (flashcard: FlashcardModel) => `${flashcard.id}-answer`;
    
    return (
        <div className="flex-container flex-column flex-grow-1 justify-content-between min-height-0">
            <div className="overflow-scroll flex-grow-1">
                <div>Editing flashcard set</div>
                <form className="flex-container flex-column">
                    <label>
                        Name:
                        <input
                            id="set-name"
                            name="name"
                            type="text"
                            defaultValue={flashcardSet.name}
                            onChange={updateNameHandler}
                            disabled={lockInfo.isLocked && !(lockInfo.activeId === baseFlashcardSet.id && lockInfo.activeField === 'name')}
                        ></input>
                    </label>
                    {
                        workingFlashcardSet.flashcards.map((flashcard) =>
                            <>
                                <hr />
                                <label htmlFor={promptId(flashcard)}>Prompt:</label>
                                <textarea
                                    key={promptId(flashcard)}
                                    id={promptId(flashcard)}
                                    className="max-width-500px"
                                    name={promptId(flashcard)}
                                    data-flashcard-id={flashcard.id}
                                    data-field-name="prompt"
                                    defaultValue={flashcard.prompt}
                                    onChange={updateFlashcardHandler}
                                    disabled={lockInfo.isLocked && !(lockInfo.activeId === flashcard.id && lockInfo.activeField === 'prompt')}
                                ></textarea>
                                <label htmlFor={answerId(flashcard)}>Answer:</label>
                                <textarea
                                    key={answerId(flashcard)}
                                    id={answerId(flashcard)}
                                    className="max-width-500px"
                                    name={answerId(flashcard)}
                                    data-flashcard-id={flashcard.id}
                                    data-field-name="answer"
                                    rows={6}
                                    defaultValue={flashcard.answer}
                                    onChange={updateFlashcardHandler}
                                    disabled={lockInfo.isLocked && !(lockInfo.activeId === flashcard.id && lockInfo.activeField === 'answer')}
                                ></textarea>
                                <div className="flex-container">
                                    <button disabled={lockInfo.isLocked} data-flashcard-id={flashcard.id}>Copy</button>
                                    <button disabled={lockInfo.isLocked} data-flashcard-id={flashcard.id} onClick={deleteFlashcardHandler}>Delete</button>
                                </div>
                            </>
                        )
                    }
                </form>
            </div>
            <div className="flex-container flex-gap-5px">
                <button disabled={lockInfo.isLocked} onClick={addFlashcardHandler}>New flashcard</button>
                <button disabled={lockInfo.isLocked}>Delete flashcard set</button>
            </div>
        </div>
    );
}
