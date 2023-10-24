import ipcUtil from '../../common/util/IpcUtil.js';
const handlerConfigurer = {
    configure(ipcMain, handlerMappings) {
        handlerMappings.forEach((handlerMapping) => {
            const channel = ipcUtil.getChannel(handlerMapping.method, handlerMapping.route);
            ipcMain.handle(channel, handlerMapping.handler);
            console.log(`Handler for channel ${channel} configured`);
        });
    }
};
export default handlerConfigurer;
