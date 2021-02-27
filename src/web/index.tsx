import './style/main.scss';

import React from 'react';
import { render } from 'react-dom';

import App from 'web/components/app';

// -----------------------------------------------------------------------------

document.querySelectorAll('.chameleon-chess').forEach(container => {
    render(<App />, container);
});
