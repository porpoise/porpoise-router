import { IRouteDescriptor, ICurrentRoute } from "../internals/api.js";
import { addPageWatcher } from "./p-link.js";
import { matchRoute } from "../internals/path-parser.js";

export interface IPorpoiseRouter extends HTMLElement {
    routes: IRouteDescriptor[];
    configure(routes: IRouteDescriptor[]): void;
    changeView(): void;
    "[[current]]": ICurrentRoute | null;
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
            
            const { doesMatch, params } = matchRoute(route.path, newPath);

            // Success:
            if (doesMatch) {
                // Set current route data:
                this["[[current]]"] = { path: newPath, params };
                this.textContent = "";
                
                // Render the element:
                if (typeof route.element === "string") {
                    this.appendChild(document.createElement(route.element));
                }

                // Dynamically create element:
                else if (typeof route.element === "function") {
                    const el = route.element(this["[[current]]"]);
                    this.appendChild(el);
                }

                // Incorrect element type:
                else {
                    this.textContent = "The 'element' property MUST be a string, or a function that returns a Node";
                }

                return;
            }
        }

        // If this point reached, no match was found:
        this.innerText = "You found a broken link";
        this["[[current]]"] = null;
    }
}

customElements.define("p-router", PorpoiseRouter);