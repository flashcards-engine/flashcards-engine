import * as React from 'react';
import FlashcardsContainer from "./FlashcardsContainer";
import {Provider} from "react-redux";
import store from './store/store';

export default function App() {
    return (
        <div className="flex-container flex-grow-1">
            <Provider store={store}>
                <FlashcardsContainer />
            </Provider>
        </div>
    )
}
