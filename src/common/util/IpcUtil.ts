export default {
    getChannel(method: string, route: string) {
        return `${method}:${route}`;
    }
}