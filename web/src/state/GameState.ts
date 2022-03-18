import { AILevel, Players, Position } from "chameleon-chess-logic";

// -----------------------------------------------------------------------------

type Game = any;

export interface GameState {
    readonly game: Game;
    beginNewGame(players: Players, ailevel: AILevel): void;
    makeMove(pawnIndex: number, destination: Position): void;
}

export function useGameState(): GameState {
    const game = {};
    const beginNewGame = () => {};
    const makeMove = () => {};
    return { game, beginNewGame, makeMove };
}
