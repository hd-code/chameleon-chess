import React, { FC } from "react";

import { Color, Player } from "core/game";
import { Button, Popup, Text } from "web/shared";

// -----------------------------------------------------------------------------

interface GameOverScreen {
  winner: Player;
  home: () => void;
  newGame: () => void;
  replay: () => void;
}

export const GameOverScreen: FC<GameOverScreen> = ({
  winner,
  home,
  newGame,
  replay,
}) => {
  return (
    <Popup className="flex col text-center">
      <Text tag="h2" className="fz-150">
        Spieler <Text>{Color[winner]}</Text> hat gewonnen
      </Text>

      <Button color={Color.red} className="my-2" onClick={replay}>
        Nochmal spielen
      </Button>

      <Button color={Color.green} className="mb-2" onClick={newGame}>
        Neues Spiel
      </Button>

      <Button color={Color.yellow} onClick={home}>
        Home
      </Button>
    </Popup>
  );
};
