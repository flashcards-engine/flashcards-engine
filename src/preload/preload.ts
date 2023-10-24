import apiFactory from "./ipc/APIFactory";
import routes from "./ipc/Routes";
const { ipcRenderer, contextBridge } = eval('require')('electron');

const api = apiFactory.getApi(ipcRenderer, routes);
contextBridge.exposeInMainWorld('api', api);
