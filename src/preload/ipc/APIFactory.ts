import { IpcRenderer } from 'electron';
import ipcUtil from "../../common/util/IpcUtil";
import { API } from "../../common/types/API";
import RouteMapping from "./RouteMapping";

let api: API;

function getApiFunction(ipcRenderer: IpcRenderer, channel: string): (...args: any[]) => Promise<any> {
    return function(...args: any[]) {
        return ipcRenderer.invoke(channel, ...args)
    };
}

function initializeApi(): API {
    return {};
}

class ApiFactory {
    getApi(ipcRenderer: IpcRenderer, routes: RouteMapping[]): API {
        if (!api) {
            api = initializeApi();
        }
        
        routes.forEach((routeMapping: RouteMapping) => {
            const channel = ipcUtil.getChannel(routeMapping.method, routeMapping.route);
            const method = routeMapping.method as string;
            if (!api[method]) {
                api[method] = {};
            }
            api[method][routeMapping.route] = getApiFunction(ipcRenderer, channel);
        });

        console.debug('api object configured:');
        console.debug(api);
        return api;
    }
}

const apiFactory = new ApiFactory();
export default apiFactory;
