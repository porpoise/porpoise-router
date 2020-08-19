const changeDependencies: Set<Function> = new Set<Function>();
export const addPageWatcher = (fn: Function) => changeDependencies.add(fn); 

class PorpoiseLink extends HTMLElement {
    "[[firstRender]]": boolean = true;

    constructor() {
        super();
        this.addEventListener("click", this.redirect);
    }

    connectedCallback() {
        if (this["[[firstRender]]"]) {
            // Map children to <a> tag:
            const innerAnchor = document.createElement("a");
            innerAnchor.classList.add("p-link");
            innerAnchor.href = "javascript:void(0)";
            this.childNodes.forEach(child => {
                this.removeChild(child);
                innerAnchor.appendChild(child);
            });
            this.appendChild(innerAnchor);
            this["[[firstRender]]"] = false;
        }
    }

    redirect() {
        const target = (this.getAttribute("href") as string).trim();

        // Change page:
        history.pushState(null, "", target);

        // Trigger <p-router> dependencies:
        changeDependencies.forEach(dependency => dependency());
    }
}

customElements.define("p-link", PorpoiseLink);