import React, { FC, useState } from 'react';

import { Player } from 'core/game-state';
import { nextPlayersType } from 'core/players';
import { AppState } from 'core/state';

import Players from './players';

// -----------------------------------------------------------------------------

const component: FC<AppState> = ({game}) => {
    const initPlayers = game?.players || {0:1, 1:0, 2:2, 3:0};
    const [players, setPlayers] = useState(initPlayers);
    const onClick = (player: Player) => setPlayers(nextPlayersType(players, player));
    return <div className='text-center'>
        <h1>Neues Spiel starten</h1>
        <Players {...{...players, onClick}} />
        <p>Hinweisetext</p>
        <h2>KI-Level</h2>
        <select name="ki">
            <option value="0">easy</option>
            <option value="1">normal</option>
            <option value="2">hard</option>
        </select>
    </div>;
};
export default component;
