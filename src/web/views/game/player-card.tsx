import React, { FC } from "react";

import { Color, PlayerType } from "core/game";
import { img } from "web/assets";

// -----------------------------------------------------------------------------

interface PlayerProps {
  active: boolean;
  className?: string;
  color: Color;
  dead: boolean;
  type: PlayerType;
}

export const PlayerCard: FC<PlayerProps> = ({
  active,
  className = "",
  color,
  dead,
  type,
}) => (
  <div
    className={[
      "border no-select p-05",
      mapColorToClass[color],
      active ? "overlay-frame" : "",
      dead ? "overlay-dark" : "",
      className,
    ].join(" ")}
    style={{ width: "3em" }}
  >
    <img src={mapTypeToImg[type]} alt="" />
  </div>
);

// -----------------------------------------------------------------------------

const mapColorToClass = {
  [Color.red]: "bgc-red",
  [Color.green]: "bgc-green",
  [Color.yellow]: "bgc-yellow",
  [Color.blue]: "bgc-blue",
};

const mapTypeToImg = {
  [PlayerType.none]: img.none,
  [PlayerType.human]: img.human,
  [PlayerType.computer]: img.computer,
};
