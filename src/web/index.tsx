import React from "react";
import { render } from "react-dom";

import "web/style/main.scss";
import { App } from "web/app";

// -----------------------------------------------------------------------------

render(<App />, document.getElementById("chameleon-chess"));
