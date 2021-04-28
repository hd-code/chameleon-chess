import { useState } from "react";

// -----------------------------------------------------------------------------

export enum View {
  about,
  game,
  home,
  settings,
  setup,
}

export interface ViewDispatcher {
  goBack: () => void;
  goTo: (view: View) => void;
}

export function useView(): [View, ViewDispatcher] {
  const [view, setView] = useState(defaultView);

  const goBack = () => {
    setView(previous);
    previous = defaultView;
  };

  const goTo = (nextView: View) => {
    previous = view;
    setView(nextView);
  };

  return [view, { goBack, goTo }];
}

// -----------------------------------------------------------------------------

const defaultView = View.home;

let previous = defaultView;
