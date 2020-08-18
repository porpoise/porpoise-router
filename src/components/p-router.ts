import { IRouteDescriptor } from "../internals/api.js";
import { addPageWatcher } from "./p-link.js";

export interface IPorpoiseRouter extends HTMLElement {
    routes: Record<string, string | IRouteDescriptor>;
    configure(routes: Record<string, string | IRouteDescriptor>): void;
}

class PorpoiseRouter extends HTMLElement implements IPorpoiseRouter {
    routes: Record<string, string | IRouteDescriptor> = Object.create(null);

    configure(routes: Record<string, string | IRouteDescriptor>) {
        this.routes = routes;

        // Listen for changes onpopstate, and on <p-link> clicks:
        window.addEventListener("popstate", this.changeView.bind(this));
        addPageWatcher(this.changeView.bind(this));
    }

    changeView() {
        
    }
}

customElements.define("p-router", PorpoiseRouter);