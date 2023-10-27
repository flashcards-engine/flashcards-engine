import * as React from 'react';
import {useAppSelector} from "../../store/hooks";
import {selectActiveEntity} from '../activeEntitySlice';

export default function Editor() {
    const activeEntity = useAppSelector(selectActiveEntity);
    
    return (
        <div>
            Active Entity ID: {activeEntity && activeEntity.value && activeEntity.value.id}<br />
            Active Entity Type: {activeEntity && activeEntity.type}<br />
            Active Entity Name: {activeEntity && activeEntity.value && activeEntity.value.name}
        </div>
    )
}