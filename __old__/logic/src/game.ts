import { AILevel, calcNextGameState } from "./ai";
import { Position } from "./board";
import { Color } from "./color";
import * as GS from "./game-state";
import { isPlayers, Players, PlayerType } from "./player";
import { hasKey, isEnum } from "./type-guards";

// -----------------------------------------------------------------------------

export interface Game {
  aiLevel: AILevel;
  gameState: GS.GameState;
  players: Players;
}

export function isGame(game: unknown): game is Game {
  return (
    hasKey(game, "aiLevel") &&
    isEnum(game.aiLevel, AILevel) &&
    hasKey(game, "gameState", GS.isGameState) &&
    hasKey(game, "players", isPlayers)
  );
}

export function isGameOver(game: Game): boolean {
  return GS.isGameOver(game.gameState);
}

export function isComputerMove(game: Game): boolean {
  return game.players[game.gameState.player] === PlayerType.computer;
}

export function beginGame(players: Players, aiLevel: AILevel): Game | null {
  const gameState = GS.getStartGameState(
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

  const gameState = GS.makeMove(game.gameState, pawnIndex, destination);
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
