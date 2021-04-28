import React, { FC } from "react";

import { Color, isGameOver } from "core/game";
import { View } from "core/view";
import type { AppProps } from "web/app";
import { Button, Logo } from "web/shared";

// -----------------------------------------------------------------------------

export const Home: FC<AppProps> = ({ game, goTo }) => {
  return (
    <div className="flex col center">
      <Logo className="mb-1 fz-250" />

      <Button
        className="mb-1"
        color={Color.red}
        disabled={!game || isGameOver(game)}
        onClick={() => goTo(View.game)}
      >
        Fortsetzen
      </Button>

      <Button
        className="mb-1"
        color={Color.green}
        onClick={() => goTo(View.setup)}
      >
        Neues Spiel
      </Button>

      <Button className="mb-1" color={Color.yellow} disabled={true}>
        Tutorial
      </Button>

      <Button color={Color.blue} onClick={() => goTo(View.settings)}>
        Einstellungen
      </Button>
    </div>
  );
};
