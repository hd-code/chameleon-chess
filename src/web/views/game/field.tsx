import React, { FC } from "react";

import { Color } from "core/game";

// -----------------------------------------------------------------------------

export enum FieldState {
  normal,
  disabled,
  marked,
}

export interface FieldProps {
  color: Color;
  state: FieldState;
}

export const Field: FC<FieldProps> = ({ color, state }) => (
  <div
    className={`hw-12 border ${mapColorClass[color]} ${mapStateClass[state]}`}
  ></div>
);

// -----------------------------------------------------------------------------

const mapColorClass = {
  [Color.red]: "bgc-red",
  [Color.green]: "bgc-green",
  [Color.yellow]: "bgc-yellow",
  [Color.blue]: "bgc-blue",
};

const mapStateClass = {
  [FieldState.normal]: "",
  [FieldState.disabled]: "overlay-dark",
  [FieldState.marked]: "overlay-bright",
};
