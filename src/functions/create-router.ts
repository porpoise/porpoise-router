import { IPorpoiseRouter } from "../components/p-router.js";
import { IRouteDescriptor, IRouterAPI } from "../internals/api.js";

export function createRouter(routes: IRouteDescriptor[]): IRouterAPI | void {
    const routerNode = document.querySelector(`p-router`) as IPorpoiseRouter;

    if (routerNode) {
        routerNode.configure(routes);
    }
    else return console.error(`Could not find <p-router></p-router> in the DOM.`);

    return {
        push(newPath: string) {
            history.pushState(null, "", newPath);
            routerNode.changeView();
        },
        get current() {            return routerNode["[[current]]"];
        }
    };
}