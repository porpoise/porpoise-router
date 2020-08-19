import { match } from "./path-parser.js";
    
export function matchPath(specifier: string, rawPath: string) {
    // Catch-all route:
    if (specifier === "*") {
        return { doesMatch: true, params: null }
    }

    // Parse the path:
    else {
        const matchData = match(specifier, { decode: decodeURIComponent })((rawPath));
        return {
            doesMatch: matchData !== false,
            params: (matchData as any).params || null
        }
    }
}