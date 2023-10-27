import * as React from 'react';
import FlashcardsContainer from "./flashcards/FlashcardsContainer";
import { Provider } from 'react-redux';
import store from './store/store';

export default function App() {
    return (
        <div>
            <Provider store={store}>
                <FlashcardsContainer />
            </Provider>
        </div>
    )
}
