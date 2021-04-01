import React, { FC, useState } from 'react';

import { Player } from 'core/game-state';
import { nextPlayersType } from 'core/players';
import { AppState } from 'core/state';
import Button from 'web/shared/button';
import Link from 'web/shared/link';
import Text from 'web/shared/text';

import Players from './players';

// -----------------------------------------------------------------------------

const component: FC<AppState> = ({ game, goTo }) => {
    const [players, setPlayers] = useState(game?.players || defaultPlayers);
    const onClick = (player: Player) => setPlayers(nextPlayersType(players, player));
    return (
        <div className='mxh-100 scroll-y text-center'>
            <Text className='c-white fz-120 text-border' type='h1'>Begin a New Game</Text>
            <Players {...{ ...players, onClick }} />
            <Button color={1}>Start Game</Button>
            {/* <p>Hinweisetext</p>
            <h2>KI-Level</h2>
            <div>
                <select name='ki'>
                    <option value='0'>easy</option>
                    <option value='1'>normal</option>
                    <option value='2'>hard</option>
                </select>
            </div> */}
            <Link onClick={() => goTo.home()}>Back</Link>
        </div>
    );
};
export default component;

// -----------------------------------------------------------------------------

const defaultPlayers = { 0: 1, 1: 0, 2: 2, 3: 0 };
