import React, { FC } from 'react';

import { isGameOver } from 'core/game';
import { Color } from 'core/game-state';
import { AppState } from 'core/state';
import { Button } from 'web/shared/button';
import { Logo } from 'web/shared/logo';

// -----------------------------------------------------------------------------

export const Home: FC<AppState> = ({ game, goTo }) => {
    return (
        <div className='flex col center'>
            <Logo className='mb-1 fz-250' />

            <Button className='mb-1' color={Color.red} disabled={!game || isGameOver(game)} onClick={() => goTo.game()}>
                Fortsetzen
            </Button>

            <Button className='mb-1' color={Color.green} onClick={() => goTo.setup()}>
                Neues Spiel
            </Button>

            <Button className='mb-1' color={Color.yellow} onClick={() => goTo.settings()}>
                Einstellungen
            </Button>

            <Button color={Color.blue} disabled={true}>
                Tutorial
            </Button>
        </div>
    );
};
