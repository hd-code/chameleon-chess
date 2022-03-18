import React from 'react';
import { View, ViewStyle } from 'react-native';

import { playAudio } from '../assets';

import { IGameState, isPlayersAlive, IPosition } from 'chameleon-chess-logic';
import { getWinner } from '../models/game';
import { TPlayers } from '../models/players';
import { INavigation } from '../models/view';

import Board from './game/Board';
import PlayerBoard from './game/PlayerBoard';
import Spacer from './basic/Spacer';
import WinnerPopup from './game/WinnerPopup';

// -----------------------------------------------------------------------------

interface GameProps {
    /** The current game state. */
    game: IGameState;
    /** Players participating in the game. */
    players: TPlayers;
    /** Navigation functions to go to other views. */
    navigation: INavigation;
    /** Is called immediately when this component is rendered.
     * `onComputerMove` is called when a computer move is made. This is useful
     * to trigger sounds or animations for computer moves as well. */
    onGameRender: (onComputerMove: () => void) => void;
    /** Gets called when the board is clicked. Returns true if a move was made,
     * false if it stays the same. */
    onPressBoard: (pawnIndex: number, clickPos: IPosition) => boolean;
    /** Gets called, when the user chooses to replay the game after winning. */
    onBeginGame: (players: TPlayers) => boolean;
}

/** The root component for the game view. */
const Game = ({game, players, navigation, onPressBoard, onGameRender, onBeginGame}: GameProps) => {
    onGameRender(() => { playAudio.drag(); });

    const playersAlive = isPlayersAlive(game);
    const winner = getWinner({players, ...game});
    const winnerProps = {players, navigation, onBeginGame};

    return <View style={wrapperStyle}>
        <Spacer />
        <PlayerBoard playersAlive={playersAlive} players={players} playerOnTurn={game.player} />
        <Spacer />
        <Board game={game} onPressBoard={onPressBoard} />

        {winner !== null && <WinnerPopup winner={winner} {...winnerProps} />}
    </View>;
};

export default Game;

// -----------------------------------------------------------------------------

const wrapperStyle: ViewStyle = {
    alignItems: 'center',
    width: '100%',
}