import React, { FC, useState } from "react";

import { AILevel, isPlayers } from "core/game";
import { usePlayers } from "core/setup-view";
import { View } from "core/view";
import type { AppProps } from "web/app";
import { Button, Link, SelectButtons, Text } from "web/shared";

import { PlayerConfig } from "./player-config";

// -----------------------------------------------------------------------------

export const Setup: FC<AppProps> = ({ beginGame, goBack, goTo }) => {
  const [aiLevel, setAiLevel] = useState(AILevel.normal);
  const { players, onClickPlayer } = usePlayers();

  const validConfig = isPlayers(players);

  const beginNewGame = () => {
    const newGameCreated = beginGame(players, aiLevel);
    if (newGameCreated) {
      goTo(View.game);
    }
  };

  return (
    <div className="mxh-100 scroll-y text-center">
      <Text className="c-white fz-120 text-border" tag="h1">
        Ein neues Spiel starten
      </Text>

      <PlayerConfig players={players} onClickPlayer={onClickPlayer} />

      <Button color={1} disabled={!validConfig} onClick={beginNewGame}>
        Spiel beginnen
      </Button>

      <p className="c-white fz-80 my-3 text-border">
        Klicke auf die Flächen, um die teilnehmenden <br /> Spieler zu
        konfigurieren.
      </p>

      <div className="fz-80">
        <Text tag="h2" className="c-white text-border mb-1">
          KI-Schwierigkeit:
        </Text>
        <SelectButtons
          onSelect={setAiLevel as any}
          options={aiLevels}
          selected={aiLevel}
        />
      </div>

      <Link className="block mt-2" onClick={goBack}>
        zurück
      </Link>
    </div>
  );
};

// -----------------------------------------------------------------------------

const aiLevels = [
  { label: "leicht", value: AILevel.easy },
  { label: "normal", value: AILevel.normal },
  { label: "schwer", value: AILevel.hard },
];
