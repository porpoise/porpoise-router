# `porpoise-router`

A simple client-side routing solution for custom elements.

```js
/* Initialize the router */
import { createRouter } from "porpoise-router";

const router = createRouter({
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

