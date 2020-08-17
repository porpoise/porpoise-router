// ES5 interop with custom elements:
import "./internals/es5-adapter.js";

// Register components:
import "./components/p-link.js";
import "./components/p-router.js";

// Setup function:
export { createRouter } from "./functions/create-router.js";

// Export typings:
export * from "./internals/api.js";

