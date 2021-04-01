import React, { FC } from 'react';

import { isGameOver } from 'core/game';
import { Color } from 'core/game-state';
import { AppState } from 'core/state';

import Button from 'web/shared/button';
import Logo from 'web/shared/logo';

// -----------------------------------------------------------------------------

const component: FC<AppState> = props => {
    return (
        <div className='flex col center'>
            <Logo className='mb-1 fz-250' />

            <Button
                className='mb-1'
                color={Color.red}
                disabled={!props.game || isGameOver(props.game)}
                onClick={() => props.goTo.game()}
            >
                Continue
            </Button>

            <Button className='mb-1' color={Color.green} onClick={() => props.goTo.setup()}>
                New Game
            </Button>

            <Button className='mb-1' color={Color.yellow} onClick={() => props.goTo.settings()}>
                Settings
            </Button>

            <Button color={Color.blue} disabled={true}>
                Tutorial
            </Button>
        </div>
    );
};
export default component;
