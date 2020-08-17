export interface IRouteDescriptor {
    element: string,
    props?: Record<string, string>
}

export class PorpoiseRouter extends HTMLElement {
    routes: Record<string, string | IRouteDescriptor> = Object.create(null);

    configure(routes: Record<string, string | IRouteDescriptor>) {
        this.routes = routes;
        window.addEventListener("popstate", this.changeView.bind(this));
    }

    changeView() {
        
    }
}