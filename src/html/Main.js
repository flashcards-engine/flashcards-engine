import * as React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import style from './style.less';

const root = createRoot(document.getElementById('root'));

window.api['GET']['/flashcard-set-groups'](
    {
        parentId: null
    }
).then((flashcardSetGroup) => {
    console.debug(flashcardSetGroup);
});

root.render(
    <StrictMode>
        <App />
    </StrictMode>
);
