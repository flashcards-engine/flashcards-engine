import { v4 as uuidv4 } from 'uuid';

let rootUuid: string;

export default {
    newUuid(): string {
        return uuidv4();
    },
    setRootUuid(newRootUuid: string): void {
        if (!rootUuid && newRootUuid) {
            rootUuid = newRootUuid;
            return;
        }
        throw new Error(`Cannot reset rootUuid to value from ${rootUuid} to ${newRootUuid}`);
    },
    getRootUuid(): string {
        return rootUuid;
    }
};