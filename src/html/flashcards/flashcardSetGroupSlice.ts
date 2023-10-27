import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import FlashcardSetGroupModel from "../../common/types/FlashcardSetGroupModel";
import groupUtil from '../../common/util/GroupUtil';
import { RootState } from "../store/store";

interface SetGroupState {
    value: FlashcardSetGroupModel | undefined;
}

interface SetGroupActionPayload {
    value: FlashcardSetGroupModel | undefined;
    groupId: string;
}

const initialState: SetGroupState = {
    value: undefined,
}

export const flashcardSetGroupSlice = createSlice({
    name: 'flashcardSetGroup',
    initialState,
    reducers: {
        updateGroup: (state: SetGroupState, action: PayloadAction<SetGroupActionPayload>) => {
            const groupId = action.payload.groupId;
            // Initially, state.value will be undefined, so this reducer is dispatched to with the root group
            // in order to set initial group state. If the root is updated in the future, the id of the root
            // will be the same as the id of the groupId in the action payload. In both cases we overwrite the
            // entire state.value with the group in the action payload. This is necessary because root has no
            // parent, so there's no parent to find and update.
            if (!state.value || state.value.id === groupId) {
                state.value = action.payload.value;
                return;
            }
            
            // Find the parent of the group described in the action payload. If found, update its value in
            // the parent's childGroups.
            const parentGroup = groupUtil.selectParentGroup(state.value, groupId);
            if (parentGroup) {
                const index = parentGroup.childGroups.findIndex(
                    (childGroup) => childGroup.id === groupId
                );
                parentGroup.childGroups.splice(index, 1, action.payload.value);
            }
        },
    }
});

// Actions
export const { updateGroup } = flashcardSetGroupSlice.actions;



// Selectors
//export const selectGroup = (state: RootState, groupId: string) => groupUtil.selectGroup(state.flashcardSetGroup.value, groupId);
export const selectTree = (state: RootState) => state.flashcardSetGroup.value;

export default flashcardSetGroupSlice.reducer;
