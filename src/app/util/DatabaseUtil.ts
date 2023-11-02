import { v4 as uuidv4 } from 'uuid';

export default {
    newUuid(): string {
        return uuidv4();
    },
};