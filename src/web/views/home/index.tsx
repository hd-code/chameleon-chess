import React, { FC } from 'react';

import { isGameOver } from 'core/game';
import { FieldColor } from 'core/game-state';
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
                color={FieldColor.red}
                disabled={isGameOver(props.game)}
                onClick={() => props.goTo.game()}
            >
                Continue
            </Button>

            <Button className='mb-1' color={FieldColor.green} onClick={() => props.goTo.setup()}>
                New Game
            </Button>

            <Button className='mb-1' color={FieldColor.yellow} onClick={() => props.goTo.settings()}>
                Settings
            </Button>

            <Button color={FieldColor.blue} disabled={true}>
                Tutorial
            </Button>
        </div>
    );
};
export default component;
