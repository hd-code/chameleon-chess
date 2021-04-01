import React, { FC, useState } from 'react';

import { Player } from 'core/game-state';
import { getDefaultPlayers, togglePlayersBySingle } from 'core/players';
import { AppState } from 'core/state';
import Button from 'web/shared/button';
import Link from 'web/shared/link';
import Text from 'web/shared/text';

import Players from './players';
import { initGame } from 'core/game';

// -----------------------------------------------------------------------------

const component: FC<AppState> = props => {
    const [players, setPlayers] = useState(props.game?.players || getDefaultPlayers());
    const onClick = (player: Player) => setPlayers(togglePlayersBySingle(players, player));

    const newGame = initGame(players);
    const beginNewGame = () => {
        const newGameCreated = props.beginNewGame(players);
        if (newGameCreated) {
            props.goTo.game();
        }
    };

    return (
        <div className='mxh-100 scroll-y text-center'>
            <Text className='c-white fz-120 text-border' type='h1'>
                Begin a New Game
            </Text>
            <Players {...{ ...players, onClick }} />
            <Button color={1} disabled={!newGame} onClick={beginNewGame}>Start Game</Button>
            {/* <p>Hinweisetext</p>
            <h2>KI-Level</h2>
            <div>
                <select name='ki'>
                    <option value='0'>easy</option>
                    <option value='1'>normal</option>
                    <option value='2'>hard</option>
                </select>
            </div> */}
            <Link onClick={props.goBack}>Back</Link>
        </div>
    );
};
export default component;
