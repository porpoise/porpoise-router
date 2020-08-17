# `porpoise-router`

A framework-agnostic, standalone router, designed for use with Web Components

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

    // path "/profile/:userId" renders 
    // <profile-view></profile-view>
    // "userId" access via (router.current.params.userId)
    "/profile/:userId": "profile-view",
});
```

## Initialize HTML:
```html
<p-router name="root"></p-router>
```

## Porpoise Integration (Optional): 
```js
import * as Porpoise from "porpoise";

// Allow access to the router:
Porpoise.globalize("router", () => router);

// Access the router in porpoise elements via this.$globals.router:
Porpoise.construct({
    /* your component... */
    events: {
        click() {
            this.$globals.router.push("/about");
        }
    }
})
