import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import FlashcardSetGroupModel from "../../common/types/FlashcardSetGroupModel";
import { RootState } from "../store/store";
import FlashcardSetModel from '../../common/types/FlashcardSetModel';
import EntityType from "../../common/types/EntityType";

interface ActiveEntityState {
    value: FlashcardSetGroupModel | FlashcardSetModel | undefined;
    type: EntityType | undefined;
}

interface SetActiveEntityActionPayload {
    value: FlashcardSetGroupModel | FlashcardSetModel;
    type: EntityType | undefined;
}

const initialState: ActiveEntityState = {
    value: undefined,
    type: undefined
}

export const activeEntitySlice = createSlice({
    name: 'activeEntity',
    initialState,
    reducers: {
        setActiveEntity: (state: ActiveEntityState, action: PayloadAction<SetActiveEntityActionPayload>) => {
            const activeType = action.payload.type;
            const activeEntity = action.payload.value;
            if (!activeType || !activeEntity) {
                
            }
            state.type = activeType;
            state.value = activeEntity;
        }
    }
});

// Actions
export const { setActiveEntity } = activeEntitySlice.actions;

// Selectors
export const selectActiveEntity = (state: RootState) => state.activeEntity;

export default activeEntitySlice.reducer;
