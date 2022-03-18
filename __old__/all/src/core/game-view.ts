import { useEffect, useState } from "react";

import {
  AILevel,
  beginGame,
  Game,
  makeComputerMove,
  makeMove,
  Players,
  Position,
} from "./game";

// -----------------------------------------------------------------------------

export interface GameState {
  readonly game: Game | null;
  beginGame: (players: Players, aiLevel: AILevel) => boolean;
  makeMove: (pawnIndex: number, destination: Position) => boolean;
  doComputerMove: (delay: number) => void;
}

export function useGame(): GameState {
  const [game, setGame] = useState<Game | null>(null);

  const begin = (players: Players, aiLevel: AILevel): boolean => {
    const newGame = beginGame(players, aiLevel);
    if (!newGame) {
      return false;
    }
    setGame(newGame);
    return true;
  };

  const move = (pawnIndex: number, destination: Position): boolean => {
    if (!game) {
      return false;
    }

    const nextGame = makeMove(game, pawnIndex, destination);
    if (!nextGame) {
      return false;
    }

    setGame(nextGame);
    return true;
  };

  const doComputerMove = (delay: number) => {
    if (!game) {
      return;
    }

    useEffect(() => {
      let isActive = true;
      setTimeout(() => {
        const nextGame = makeComputerMove(game);
        if (nextGame) {
          setTimeout(() => {
            if (isActive) {
              setGame(nextGame);
            }
          }, 20);
        }
      }, delay);

      return () => {
        isActive = false;
      };
    });
  };

  return {
    game,
    beginGame: begin,
    makeMove: move,
    doComputerMove,
  };
}
