// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from "react";
import * as ReactDOM from "react-dom/client";

import { App } from "./App";
import "./styles/styles.scss";

const container = document.getElementById("chameleon-chess");
ReactDOM.createRoot(container!).render(<App />); // eslint-disable-line @typescript-eslint/no-non-null-assertion
