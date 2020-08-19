import { IPorpoiseRouter } from "../components/p-router.js";
import { IRouteDescriptor } from "../internals/api.js";

export function createRouter(target: string, routes: IRouteDescriptor[]) {
    const routerNode = document.querySelector(`p-router[name="${target}"]`) as IPorpoiseRouter;

    if (routerNode) {
        routerNode.configure(routes);
    }
    else console.error(`Could not find <p-router name="${target}"></p-router> in the DOM.`);
}