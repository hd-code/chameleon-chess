import { GameState, getNextGameStates } from "./GameState";

export enum AILevel {
    easy,
    normal,
    hard,
}

export function calcNextGameState(
    gs: GameState,
    aiLevel: AILevel = AILevel.normal,
): GameState {
    const nextGSs = getNextGameStates(gs);
    return nextGSs[Math.floor(Math.random() * nextGSs.length)];
}
