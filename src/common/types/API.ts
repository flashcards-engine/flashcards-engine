interface APIMethod {
    [key: string]: (...args: any[]) => Promise<any>;
}

export interface API {
    [httpMethod: string]: APIMethod;
}
