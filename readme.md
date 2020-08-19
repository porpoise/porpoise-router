# `porpoise-router`

A framework-agnostic, standalone router, designed for use with Web Components

## Install: 
`npm i porpoise-router`

## Initialize JS:
```js
/* Initialize the router */
import { createRouter } from "porpoise-router";

const router = createRouter("root", {
    // path "/" renders 
    // <index-view></index-view>
    "/": "index-view", 

    // path "/about" renders 
    // <about-view></about-view>
    "/about": "about-view", 

    // "user" access via (params.user)
    "/profile/:user": ({ params }) => 
        document.createTextNode(`Welcome to ${params.user}'s profile!`),
});
```

## Initialize HTML:
```html
<p-router name="root"></p-router>
```

## Porpoise Integration (Recommended if using w/porpoise): 
```js
import * as Porpoise from "porpoise";

// Allow access to the router:
Porpoise.globalize("router", () => router);
Porpoise.globalize("route", () => router.current);

// Access the router in porpoise elements via this.$globals.router:
Porpoise.construct({
    /* your component... */
    events: {
        click() {
            this.$globals.router.push("/about");
            console.log(this.$globals.route.params);
        }
    }
})
