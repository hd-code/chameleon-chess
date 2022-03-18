import React, { FC, useEffect, useState } from "react";

import { GameState, useGame } from "core/game-view";
import { View, ViewDispatcher, useView } from "core/view";
import { About } from "web/views/about";
import { Game as GameView } from "web/views/game";
import { Home } from "web/views/home";
import { Setup } from "web/views/setup";
import { Settings } from "web/views/settings";

// -----------------------------------------------------------------------------

export interface AppProps extends GameState, ViewDispatcher {
  height: number;
  width: number;
}

export const App: FC = () => {
  const [view, viewState] = useView();
  const game = useGame();
  const { height, width, appRef } = useDimensions();

  return (
    <div
      className="hw-100 no-overflow flex center middle font-1 fz-140"
      ref={appRef}
    >
      {loadView(view, { ...game, ...viewState, height, width })}
    </div>
  );
};

// -----------------------------------------------------------------------------

function loadView(view: View, props: AppProps) {
  switch (view) {
    case View.about:
      return <About {...props} />;

    case View.game:
      return <GameView {...props} />;

    case View.home:
      return <Home {...props} />;

    case View.setup:
      return <Setup {...props} />;

    case View.settings:
      return <Settings {...props} />;
  }
}

function useDimensions(): {
  height: number;
  width: number;
  appRef: (div: HTMLDivElement | null) => void;
} {
  const [{ height, width }, setDimensions] = useState({
    height: 0,
    width: 0,
  });
  const appRef = (div: HTMLDivElement | null) => {
    if (div) {
      const newHeight = div.clientHeight;
      const newWidth = div.clientWidth;
      if (newHeight !== height || newWidth !== width) {
        setDimensions({ height: newHeight, width: newWidth });
      }
    }
  };

  useEffect(() => {
    const refreshDimensions = () => {
      setDimensions({ height: 0, width: 0 });
    };

    window.addEventListener("resize", refreshDimensions);

    return () => {
      window.removeEventListener("resize", refreshDimensions);
    };
  });

  return { height, width, appRef };
}
