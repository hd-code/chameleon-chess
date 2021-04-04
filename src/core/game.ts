import { AILevel, makeComputerMove as computerMove } from 'core/ai';
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
    readonly aiLevel: AILevel;
    gameStates: GameState[];
    readonly players: Players;
}

export function getCurrentGameState(game: Game): GameState {
    return game.gameStates[game.gameStates.length - 1];
}

export function initGame(players: Players, aiLevel = AILevel.normal): Game | null {
    const gs = getStartGameState(
        players[Color.red] !== PlayerType.none,
        players[Color.green] !== PlayerType.none,
        players[Color.yellow] !== PlayerType.none,
        players[Color.blue] !== PlayerType.none,
    );

    if (!gs) {
        return null;
    }

    return { aiLevel, gameStates: [gs], players };
}

export function isGameOver(game: Game): boolean {
    const gs = getCurrentGameState(game);
    return gameOver(gs);
}

export function isComputerTurn(game: Game): boolean {
    // const currentGS = getCurrentGameState(game);
    // return game.players[currentGS.player] === PlayerType.computer;
    return false;
}

export function makeMove(game: Game, pawnIndex: number, destination: Position): Game | null {
    if (isComputerTurn(game)) {
        return null;
    }

    const nextGS = move(getCurrentGameState(game), pawnIndex, destination);
    if (!nextGS) {
        return null;
    }

    game.gameStates.push(nextGS);
    return game;
}

export function makeComputerMove(game: Game): Promise<Game> {
    return new Promise((resolve, reject) => {
        if (computerIsRunning) {
            return reject();
        }

        if (!isComputerTurn(game)) {
            return reject('Computer is not on turn');
        }

        computerIsRunning = true;

        const currentGS = getCurrentGameState(game);
        const aiLevel = game.aiLevel;

        const begin = Date.now();
        const nextGS = computerMove(currentGS, aiLevel);

        const duration = Date.now() - begin;
        const timeout = Math.max(1, computerMinTime - duration);

        setTimeout(() => {
            game.gameStates.push(nextGS);
            resolve(game);
            computerIsRunning = false;
        }, timeout);
    });
}

// -----------------------------------------------------------------------------

const computerMinTime = 1000;
let computerIsRunning = false;
