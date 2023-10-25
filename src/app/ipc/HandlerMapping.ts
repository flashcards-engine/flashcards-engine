import { IpcMainInvokeEvent } from "electron";
import Method from "../../common/types/Method.js";

type IpcMainHandler = (event: IpcMainInvokeEvent, ...args: any[]) => (Promise<any>) | (any);

export default interface HandlerMapping {
    method: Method;
    route: string;
    handler: IpcMainHandler;
}
