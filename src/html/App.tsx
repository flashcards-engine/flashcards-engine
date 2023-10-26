import * as React from 'react';
//import { useState } from 'react';
import FlashcardsContainer from "./flashcards/FlashcardsContainer";

export default function App() {
    try {
        throw new Error();
    } catch (e) {
        console.log(e.stack);
    }
//    const [value, setValue] = useState(null);

    return (
        <div>
            <FlashcardsContainer />
        </div>
    )
}
