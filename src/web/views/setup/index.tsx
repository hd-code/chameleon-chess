import React, { FC, useState } from 'react';

import { AILevel, isValidPlayerConfig, usePlayerConfig } from 'core/game';
import { View } from 'core/view';
import type { AppProps } from 'web/app';
import { Button, Link, SelectButtons, Text } from 'web/shared';

import { PlayerConfig } from './player-config';

// -----------------------------------------------------------------------------

export const Setup: FC<AppProps> = ({ beginGame, goBack, goTo }) => {
    const [aiLevel, setAiLevel] = useState(AILevel.normal);
    const aiLevels = [
        { label: 'leicht', value: AILevel.easy },
        { label: 'normal', value: AILevel.normal },
        { label: 'schwer', value: AILevel.hard },
    ];

    const { playerConfig, onClickPlayer } = usePlayerConfig();

    const validConfig = isValidPlayerConfig(playerConfig);

    const beginNewGame = () => {
        const newGameCreated = beginGame(playerConfig, aiLevel);
        if (newGameCreated) {
            goTo(View.game);
        }
    };

    return (
        <div className='mxh-100 scroll-y text-center'>
            <Text className='c-white fz-120 text-border' Tag='h1'>
                Ein neues Spiel starten
            </Text>

            <PlayerConfig playerConfig={playerConfig} onClickPlayer={onClickPlayer} />

            <Button color={1} disabled={!validConfig} onClick={beginNewGame}>
                Spiel beginnen
            </Button>

            <p className='c-white fz-80 my-3 text-border'>
                Klicke auf die Flächen, um die teilnehmenden <br /> Spieler zu konfigurieren.
            </p>

            <div className='fz-80'>
                <Text Tag='h2' className='c-white text-border mb-1'>
                    KI-Schwierigkeit:
                </Text>
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                <SelectButtons onSelect={setAiLevel as any} options={aiLevels as any} selected={aiLevel as any} />
            </div>

            <Link className='block mt-2' onClick={goBack}>
                zurück
            </Link>
        </div>
    );
};
