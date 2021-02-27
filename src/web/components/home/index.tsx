import React, { FC } from 'react';

import { isGameOver } from 'core/game';
import { AppState } from 'core/state';

import Logo from '../shared/logo';

// -----------------------------------------------------------------------------

const component: FC<AppState> = (props) => {
    const buttonClasses = ' c-contrast p-1 mb-1 rounded';
    return <div className='flex col center'>
        <Logo className='mb-1 fz-250' />

        <button className={'bgc-red pointer' + buttonClasses}
            disabled={isGameOver(props.game)}
            onClick={() => props.goTo.game()}
        >
            Fortsetzen
        </button>

        <button className={'bgc-green pointer' + buttonClasses} onClick={() => props.goTo.setup()}>
            Neues Spiel
        </button>

        <button className={'bgc-yellow pointer' + buttonClasses} onClick={() => props.goTo.settings()}>
            Einstellungen
        </button>

        <button className={'bgc-blue overlay-dark' + buttonClasses} disabled>
            Tutorial
        </button>
    </div>;
};
export default component;
