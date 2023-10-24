import * as React from 'react';
import { MouseEvent } from 'react';

export default function App() {
    const handleClick = (event: MouseEvent): void => {
        const input = event.currentTarget.nextSibling as HTMLInputElement;
        window.api['GET']['/hello'](input.value);
    };
    
    return (
        <>
            <div>Hello world</div>
            <button onClick={handleClick}>Button</button>
            <input id="text-input" type="text" />
        </>
    )
}
