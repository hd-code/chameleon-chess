import React, { FC } from "react";

import { isGameOver } from "core/game";
import { View } from "core/view";
import type { AppProps } from "web/app";

import { Board } from "./board";
import { GameOverScreen } from "./game-over-screen";
import { PlayerCards } from "./player-cards";

// -----------------------------------------------------------------------------

export const Game: FC<AppProps> = ({
  game,
  height,
  width,
  beginGame,
  doComputerMove,
  goTo,
  makeMove,
}) => {
  if (!game) {
    console.warn("There is no game to be played.");
    goTo(View.home);
    return <></>;
  }

  doComputerMove(500);

  const boardWidth = Math.min(height, width) * 0.98;
  const isPortrait = height > width;

  return (
    <div className={"flex middle" + (isPortrait ? " col center" : "")}>
      <PlayerCards
        gameState={game.gameState}
        goToHome={() => goTo(View.home)}
        goToSettings={() => goTo(View.settings)}
        isPortrait={isPortrait}
        players={game.players}
      />

      <Board gameState={game.gameState} makeMove={makeMove} size={boardWidth} />

      {isGameOver(game) && (
        <GameOverScreen
          winner={game.gameState.player}
          home={() => goTo(View.home)}
          newGame={() => goTo(View.setup)}
          replay={() => beginGame(game.players, game.aiLevel)}
        />
      )}
    </div>
  );
};
