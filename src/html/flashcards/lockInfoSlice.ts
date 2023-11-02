import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {RootState} from "../store/store";

interface NavigationLockState {
    isLocked: boolean;
    timeout: number;
    activeId: string | undefined;
    activeField: string | undefined;
}

interface SetNavigationLockActionPayload {
    isLocked: boolean;
    activeId?: string;
    activeField?: string;
}

const initialState: NavigationLockState = {
    isLocked: false,
    timeout: 250,
    activeId: undefined,
    activeField: undefined,
}

export const lockInfoSlice = createSlice({
    name: 'lockInfo',
    initialState,
    reducers: {
        setLockInfo: (state: NavigationLockState, action: PayloadAction<SetNavigationLockActionPayload>) => {
            state.isLocked = action.payload.isLocked;
            state.activeId = action.payload.activeId;
            state.activeField = action.payload.activeField;
        }
    }
});

// Actions
export const { setLockInfo } = lockInfoSlice.actions;

// Selectors
export const selectLockInfo = (state: RootState) => state.lockInfo;
export const selectLockTimeout = (state: RootState) => state.lockInfo.timeout;

export default lockInfoSlice.reducer;
