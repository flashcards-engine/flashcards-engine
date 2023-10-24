declare global {
    interface Window {
        api: import('../../common/types/API').API;
    }
}

export {};