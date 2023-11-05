import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import FlashcardSetGroupModel from "../../common/types/FlashcardSetGroupModel";
import groupUtil from '../../common/util/GroupUtil';
import {RootState} from "../store/store";
import FlashcardSetModel from '../../common/types/FlashcardSetModel';
import FlashcardModel from '../../common/types/FlashcardModel';

// Action payloads
interface ReplaceGroupActionPayload {
    value: FlashcardSetGroupModel;
}

interface UpdateGroupActionPayload {
    value: FlashcardSetGroupModel;
}

interface UpdateSetActionPayload {
    value: FlashcardSetModel;
}

interface UpdateFlashcardActionPayload {
    value: FlashcardModel;
    groupId: string;
    setId: string;
}

interface AppendChildGroupActionPayload {
    value: FlashcardSetGroupModel;
}

interface AppendSetActionPayload {
    value: FlashcardSetModel;
}

interface AppendFlashcardActionPayload {
    groupId: string;
    setId: string;
    value: FlashcardModel;
}

interface DeleteGroupActionPayload {
    value: FlashcardSetGroupModel;
}

interface DeleteSetActionPayload {
    value: FlashcardSetModel;
}

interface DeleteFlashcardActionPayload {
    groupId: string;
    setId: string;
    value: string;
}

// State
interface SetGroupState {
    value: FlashcardSetGroupModel | undefined;
}

const initialState: SetGroupState = {
    value: undefined,
}

export const flashcardSetGroupSlice = createSlice({
    name: 'flashcardSetGroup',
    initialState,
    reducers: {
        replaceGroup: (state: SetGroupState, action: PayloadAction<ReplaceGroupActionPayload>) => {
            if (!action.payload.value.parentId) {
                state.value = action.payload.value;
                return;
            }

            const parentGroup = groupUtil.findGroup(state.value, action.payload.value.parentId);
            if (parentGroup) {
                const childGroupIndex = parentGroup.childGroups.findIndex((childGroup) => childGroup.id === action.payload.value.id);
                parentGroup.childGroups[childGroupIndex] = action.payload.value;
            }
        },
        updateGroup: (state: SetGroupState, action: PayloadAction<UpdateGroupActionPayload>) => {
            const group = groupUtil.findGroup(state.value, action.payload.value.id);
            if (group) {
                group.name = action.payload.value.name;
            }
        },
        updateSet: (state: SetGroupState, action: PayloadAction<UpdateSetActionPayload>) => {
            const ownerGroup = groupUtil.findGroup(state.value, action.payload.value.groupId);
            if (ownerGroup) {
                ownerGroup.flashcardSets.some((flashcardSet) => {
                    if (flashcardSet.id === action.payload.value.id) {
                        flashcardSet.name = action.payload.value.name;
                        return true;
                    }
                });
            }
        },
        updateFlashcard: (state: SetGroupState, action: PayloadAction<UpdateFlashcardActionPayload>) => {
            const ownerGroup = groupUtil.findGroup(state.value, action.payload.groupId);
            if (ownerGroup) {
                const flashcardSet = ownerGroup.flashcardSets.find((fs) => fs.id === action.payload.setId);
                if (flashcardSet) {
                    flashcardSet.flashcards.some((flashcard) => {
                        if (flashcard.id === action.payload.value.id) {
                            flashcard.prompt = action.payload.value.prompt;
                            flashcard.answer = action.payload.value.answer;
                            return true;
                        }
                    });
                }
            }
        },
        appendChildGroup: (state: SetGroupState, action: PayloadAction<AppendChildGroupActionPayload>) => {
            const parentGroup = groupUtil.findGroup(state.value, action.payload.value.parentId);
            if (parentGroup) {
                parentGroup.childGroups.push(action.payload.value);
            }
        },
        appendSet: (state: SetGroupState, action: PayloadAction<AppendSetActionPayload>) => {
            const ownerGroup = groupUtil.findGroup(state.value, action.payload.value.groupId);
            if (ownerGroup) {
                ownerGroup.flashcardSets.push(action.payload.value);
            }
        },
        appendFlashcard: (state: SetGroupState, action: PayloadAction<AppendFlashcardActionPayload>) => {
            const ownerGroup = groupUtil.findGroup(state.value, action.payload.groupId);
            if (ownerGroup) {
                const setIndex = ownerGroup.flashcardSets.findIndex((fs) => fs.id === action.payload.setId);
                ownerGroup.flashcardSets[setIndex].flashcards = [...ownerGroup.flashcardSets[setIndex].flashcards, action.payload.value];
            }
        },
        deleteGroup: (state: SetGroupState, action: PayloadAction<DeleteGroupActionPayload>) => {
            const parentGroup = groupUtil.findGroup(state.value, action.payload.value.parentId);
            if (parentGroup) {
                const newChildGroups = [...parentGroup.childGroups];
                const childGroupIndex = newChildGroups.findIndex((cg) => cg.id === action.payload.value.id);
                newChildGroups.splice(childGroupIndex, 1);
                parentGroup.childGroups = newChildGroups;
            }
        },
        deleteSet: (state: SetGroupState, action: PayloadAction<DeleteSetActionPayload>) => {
            const ownerGroup = groupUtil.findGroup(state.value, action.payload.value.groupId);
            if (ownerGroup) {
                const newSets = [...ownerGroup.flashcardSets];
                const setIndex = newSets.findIndex((fs) => fs.id === action.payload.value.id);
                newSets.splice(setIndex, 1);
                ownerGroup.flashcardSets = newSets;
            }
        },
        deleteFlashcard: (state: SetGroupState, action: PayloadAction<DeleteFlashcardActionPayload>) => {
            const ownerGroup = groupUtil.findGroup(state.value, action.payload.groupId);
            if (ownerGroup) {
                const setIndex = ownerGroup.flashcardSets.findIndex((fs) => fs.id === action.payload.setId);
                const newFlashcards = [...ownerGroup.flashcardSets[setIndex].flashcards];
                const flashcardIndex = newFlashcards.findIndex((f) => f.id === action.payload.value);
                newFlashcards.splice(flashcardIndex, 1);
                ownerGroup.flashcardSets[setIndex].flashcards = newFlashcards;
            }
        },
    }
});

// Actions
export const {
    replaceGroup,
    updateGroup,
    updateSet,
    updateFlashcard,
    appendChildGroup,
    appendSet,
    appendFlashcard,
    deleteGroup,
    deleteSet,
    deleteFlashcard,
} = flashcardSetGroupSlice.actions;

// Selectors
//export const selectGroup = (state: RootState, groupId: string) => groupUtil.selectGroup(state.flashcardSetGroup.value, groupId);
export const selectTree = (state: RootState) => state.flashcardSetGroup.value;
export const selectFlashcardSet = (state: RootState, groupId: string, setId: string) => {
    const ownerGroup = groupUtil.findGroup(state.flashcardSetGroup.value, groupId);
    if (ownerGroup) {
        for (const flashcardSet of ownerGroup.flashcardSets) {
            if (flashcardSet.id === setId) {
                return flashcardSet;
            }
        }
    }
}

export default flashcardSetGroupSlice.reducer;
