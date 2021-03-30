import React, { FC } from 'react';

import { isGameOver } from 'core/game';
import { AppState } from 'core/state';

import Logo from 'web/shared/logo';
import Text from 'web/shared/text';

// -----------------------------------------------------------------------------

const component: FC<AppState> = props => {
    const buttonClasses = ' c-white text-border border p-1 mb-1 rounded';
    return (
        <div className='flex col center'>
            <Logo className='mb-1 fz-250' />

            <button
                className={'bgc-red pointer' + buttonClasses}
                disabled={isGameOver(props.game)}
                onClick={() => props.goTo.game()}
            >
                <Text>Continue</Text>
            </button>

            <button className={'bgc-green pointer' + buttonClasses} onClick={() => props.goTo.setup()}>
                <Text>New Game</Text>
            </button>

            <button className={'bgc-yellow pointer' + buttonClasses} onClick={() => props.goTo.settings()}>
                <Text>Settings</Text>
            </button>

            <button className={'bgc-blue overlay-dark' + buttonClasses} disabled>
                <Text>Tutorial</Text>
            </button>
        </div>
    );
};
export default component;
