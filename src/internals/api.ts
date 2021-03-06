export interface ICurrentRoute {
    path: string,
    params: Record<string, string>
}

export interface IRouteDescriptor {
    path: string
    element: string | ((currentRoute: ICurrentRoute) => Node),
}

export interface IRouterAPI {
    push(path: string): void;
    current: ICurrentRoute | null;
}