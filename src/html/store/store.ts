import { configureStore } from '@reduxjs/toolkit';
import flashcardSetGroupReducer from '../flashcards/flashcardSetGroupSlice';
import lockInfoReducer from "../flashcards/lockInfoSlice";

const store = configureStore({
    reducer: {
        flashcardSetGroup: flashcardSetGroupReducer,
        lockInfo: lockInfoReducer,
    },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
