import { IpcMain } from "electron";
import ipcUtil from '../../common/util/IpcUtil.js';
import HandlerMapping from "./HandlerMapping.js";

const handlerConfigurer = {
    configure(ipcMain: IpcMain, handlerMappings: HandlerMapping[]) {
        handlerMappings.forEach((handlerMapping) => {
            const channel = ipcUtil.getChannel(handlerMapping.method, handlerMapping.route);
            ipcMain.handle(channel, handlerMapping.handler);
            console.log(`Handler for channel ${channel} configured`);
        });
    }
};

export default handlerConfigurer;
