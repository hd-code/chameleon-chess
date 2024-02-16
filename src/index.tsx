import * as React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./ui/App";

window.addEventListener("DOMContentLoaded", () => {
    const root = document.getElementById("chameleon-chess");
    if (root) {
        createRoot(root).render(
            <React.StrictMode>
                <App />
            </React.StrictMode>,
        );
    }
});
