import {
    Color,
    GameState,
    Position,
    isGameOver as gameOver,
    getStartGameState,
    makeMove as move,
} from 'core/game-state';
import { PlayerType, Players } from 'core/players';

// -----------------------------------------------------------------------------

export interface Game {
    gameStates: GameState[];
    readonly players: Players;
}

export function getCurrentGameState(game: Game): GameState {
    return game.gameStates[game.gameStates.length - 1];
}

export function initGame(players: Players): Game | null {
    const gs = getStartGameState(
        players[Color.red] !== PlayerType.none,
        players[Color.green] !== PlayerType.none,
        players[Color.yellow] !== PlayerType.none,
        players[Color.blue] !== PlayerType.none,
    );

    if (!gs) {
        return null;
    }

    return { gameStates: [gs], players };
}

export function isGameOver(game: Game): boolean {
    const gs = getCurrentGameState(game);
    return gameOver(gs);
}

export function makeMove(pawnIndex: number, destination: Position, game: Game): Game | null {
    const nextGS = move(getCurrentGameState(game), pawnIndex, destination);
    if (!nextGS) {
        return null;
    }
    game.gameStates.push(nextGS);
    return game;
}
