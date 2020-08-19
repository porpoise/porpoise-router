import { IRouteDescriptor, ICurrentRoute } from "../internals/api.js";
import { addPageWatcher } from "./p-link.js";
import { matchPath } from "../internals/match-path.js";

export interface IPorpoiseRouter extends HTMLElement {
    routes: IRouteDescriptor[];
    configure(routes: IRouteDescriptor[]): void;
}

class PorpoiseRouter extends HTMLElement implements IPorpoiseRouter {
    "[[current]]": ICurrentRoute | null;
    routes: IRouteDescriptor[] = [];

    configure(routes: IRouteDescriptor[]) {
        this.routes = routes;

        // Listen for changes onpopstate, and on <p-link> clicks:
        window.addEventListener("popstate", () => {
            this.changeView.bind(this)
        });
        addPageWatcher(this.changeView.bind(this));
        this.changeView();
    }

    changeView() {
        const newPath = location.pathname.startsWith("/") ? location.pathname : `/${location.pathname}`;
        console.log(newPath);

        for (const n in this.routes) {
            const route = this.routes[n];
            
            const { doesMatch, params } = matchPath(route.path, newPath);

            // Success:
            if (doesMatch) {
                // Set current route data:
                this["[[current]]"] = { path: newPath, params };
                this.textContent = "";
                this.appendChild(document.createElement(route.element));
                return;
            }
        }

        // If this point reached, no match was found:
        this.innerText = "You found a broken link";
        this["[[current]]"] = null;
    }
}

customElements.define("p-router", PorpoiseRouter);