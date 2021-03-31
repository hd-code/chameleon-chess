import * as GS from 'core/game-state';
import { PlayerType, Players } from 'core/players';

// -----------------------------------------------------------------------------

export interface Game {
    gameStates: GS.GameState[];
    readonly players: Players;
}

export function getCurrentGameState(game: Game): GS.GameState {
    return game.gameStates[game.gameStates.length - 1];
}

export function initGame(players: Players): Game | null {
    const gs = GS.getStartGameState(
        players[GS.Player.red] !== PlayerType.none,
        players[GS.Player.green] !== PlayerType.none,
        players[GS.Player.yellow] !== PlayerType.none,
        players[GS.Player.blue] !== PlayerType.none,
    );

    if (!gs) {
        return null;
    }

    return { gameStates: [gs], players };
}

export function isGameOver(game: Game): boolean {
    const gs = getCurrentGameState(game);
    return GS.isGameOver(gs);
}

export function makeMove(pawnIndex: number, destination: GS.Position, game: Game): Game | null {
    const nextGS = GS.makeMove(getCurrentGameState(game), pawnIndex, destination);
    if (!nextGS) {
        return null;
    }
    game.gameStates.push(nextGS);
    return game;
}
