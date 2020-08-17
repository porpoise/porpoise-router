// ES5 interop with custom elements:
import "./es5-adapter.js";
import { PorpoiseRouter, IRouteDescriptor } from "./porpoise-router.js";
import { pathToRegexp } from "path-to-regexp";

export default function createRouter(target: string, routes: Record<string, string | IRouteDescriptor>) {
    const routerNode = document.querySelector(`porpoise-router[name="${target}"]`) as PorpoiseRouter;

    if (routerNode) {
        routerNode.configure(routes);
    }
    else console.error(`Could not find <porpoise-router name="${target}"></porpoise-router> in the DOM.`);
}