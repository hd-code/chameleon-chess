import { GameState, Player, Position, getStartGameState, isGameOver as isGameOverGS, makeMove as makeMoveGS } from './game-state';
import { PlayerType, Players } from './players';

// -----------------------------------------------------------------------------

export interface Game {
    gameStates: GameState[];
    players: Players;
}

export function getCurrentGameState(game: Game): GameState {
    return game.gameStates[game.gameStates.length - 1];
}

export function initGame(players: Players): Game | null {
    const gs = getStartGameState(
        players[Player.red] !== PlayerType.none,
        players[Player.green] !== PlayerType.none,
        players[Player.yellow] !== PlayerType.none,
        players[Player.blue] !== PlayerType.none,
    );

    if (!gs) {
        return null;
    }

    return { gameStates: [gs], players };
}

export function isGameOver(game: Game): boolean {
    const gs = getCurrentGameState(game);
    return isGameOverGS(gs);
}

export function makeMove(pawnIndex: number, destination: Position, game: Game): Game | null {
    const nextGS = makeMoveGS(getCurrentGameState(game), pawnIndex, destination);
    if (!nextGS) {
        return null;
    }
    game.gameStates.push(nextGS);
    return game;
}