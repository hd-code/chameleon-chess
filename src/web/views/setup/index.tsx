import React, { FC, useState } from 'react';

import { AILevel } from 'core/ai';
import { initGame } from 'core/game';
import { Player } from 'core/game-state';
import { getDefaultPlayers, togglePlayersBySingle } from 'core/players';
import { AppState } from 'core/state';
import { Button } from 'web/shared/button';
import { Link } from 'web/shared/link';
import { Text } from 'web/shared/text';

import { Players } from './players';

// -----------------------------------------------------------------------------

export const Setup: FC<AppState> = props => {
    const [players, setPlayers] = useState(getDefaultPlayers());
    const onClick = (player: Player) => setPlayers(togglePlayersBySingle(players, player));

    const newGame = initGame(players);
    const beginNewGame = () => {
        const newGameCreated = props.beginNewGame(players, AILevel.normal);
        if (newGameCreated) {
            props.goTo.game();
        }
    };

    return (
        <div className='mxh-100 scroll-y text-center'>
            <Text className='c-white fz-120 text-border' Tag='h1'>
                Ein neues Spiel starten
            </Text>

            <Players players={players} onClick={onClick} />

            <Button color={1} disabled={!newGame} onClick={beginNewGame}>
                Spiel beginnen
            </Button>

            <p className='c-white fz-80 my-2 text-border'>
                Klicke auf die Flächen, um die teilnehmenden <br /> Spieler zu konfigurieren.
            </p>

            <Link onClick={props.goBack}>zurück</Link>
        </div>
    );
};
