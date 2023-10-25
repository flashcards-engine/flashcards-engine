import { IpcMain } from "electron";
import ipcUtil from '../../common/util/IpcUtil.js';
import { Objects } from '../configuration/AppConfigurer.js';
import Controller from './Controller.js';
import HandlerMapping from "./HandlerMapping.js";

const handlerConfigurer = {
    configure(ipcMain: IpcMain, objects: Objects) {
        let handlerMappings: HandlerMapping[] = [];

        for (const name in objects) {
            if (objects[name] && objects[name] instanceof Controller) {
                handlerMappings = handlerMappings.concat((objects[name] as Controller).getHandlerMappings());
            }
        }

        handlerMappings.forEach((handlerMapping) => {
            const channel = ipcUtil.getChannel(handlerMapping.method, handlerMapping.route);
            ipcMain.handle(channel, handlerMapping.handler);
            console.log(`Handler for channel ${channel} configured`);
        });
    }
};

export default handlerConfigurer;
