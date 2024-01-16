import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { App } from "./App";
import "./index.css";

ReactDOM.createRoot(
    document.getElementById("chameleon-chess") as HTMLDivElement,
).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);
