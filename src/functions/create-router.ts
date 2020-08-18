import { IPorpoiseRouter } from "../components/p-router.js";
import { IRouteDescriptor } from "../internals/api.js";

export function createRouter(target: string, routes: Record<string, string | IRouteDescriptor>) {
    const routerNode = document.querySelector(`p-router[name="${target}"]`) as IPorpoiseRouter;

    if (routerNode) {
        routerNode.configure(routes);
    }
    else console.error(`Could not find <porpoise-router name="${target}"></porpoise-router> in the DOM.`);
}