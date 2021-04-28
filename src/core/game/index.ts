import { AILevel, calcNextGameState } from "./ai";
import { Position } from "./board";
import { Color } from "./color";
import {
  GameState,
  getStartGameState,
  isGameOver as gameOver,
  makeMove as move,
} from "./game-state";
import { Players, PlayerType } from "./players";

// -----------------------------------------------------------------------------

export { AILevel } from "./ai";
export * from "./board";
export * from "./color";
export { GameState, getPlayersAlive } from "./game-state";
export { Limits, isWithinLimits } from "./game-state/limits";
export {
  Pawn,
  getPawnIndexAtPosition,
  getPawnMoves,
  getPawnRoles,
} from "./game-state/pawn";
export { Role, Roles } from "./game-state/roles";
export * from "./players";

// -----------------------------------------------------------------------------

export interface Game {
  aiLevel: AILevel;
  gameState: GameState;
  players: Players;
}

export function beginGame(players: Players, aiLevel: AILevel): Game | null {
  const gameState = getStartGameState(
    players[Color.red] != PlayerType.none,
    players[Color.green] != PlayerType.none,
    players[Color.yellow] != PlayerType.none,
    players[Color.blue] != PlayerType.none,
  );

  if (!gameState) {
    return null;
  }

  return { aiLevel, gameState, players };
}

export function makeMove(
  game: Game,
  pawnIndex: number,
  destination: Position,
): Game | null {
  if (isComputerMove(game)) {
    return null;
  }

  const gameState = move(game.gameState, pawnIndex, destination);
  if (!gameState) {
    return null;
  }

  return { ...game, gameState };
}

export function makeComputerMove(game: Game): Game | null {
  if (!isComputerMove(game) || isGameOver(game)) {
    return null;
  }

  const gameState = calcNextGameState(game.gameState, game.aiLevel);
  return { ...game, gameState };
}

export function isGameOver(game: Game): boolean {
  return gameOver(game.gameState);
}

// -----------------------------------------------------------------------------

function isComputerMove(game: Game): boolean {
  return game.players[game.gameState.player] === PlayerType.computer;
}
