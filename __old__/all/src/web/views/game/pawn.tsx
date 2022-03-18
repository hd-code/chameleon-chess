import React, { FC } from "react";

import { Color, Pawn as PawnData, Role, getPawnRoles } from "core/game";
import { img } from "web/assets";

// -----------------------------------------------------------------------------

interface PawnProps extends PawnData {
  selected: boolean;
}

export const Pawn: FC<PawnProps> = (props) => {
  const offset = {
    left: props.position.col * 12.5 + "%",
    top: props.position.row * 12.5 + "%",
  };
  const roles = getPawnRoles(props);

  return (
    <div
      className="hw-12 flex center middle absolute transition no-select"
      style={offset}
    >
      <div
        className={
          "hw-75 border rounded flex center middle " +
          mapColorToClass[props.player] +
          (props.selected ? " overlay-bright" : "")
        }
      >
        <div className="hw-75 flex wrap">
          {colorOrder.map((color) => (
            <img
              key={color}
              className={"hw-50 " + mapColorToClass[color]}
              src={mapRoleToIcon[roles[color]]}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// -----------------------------------------------------------------------------

const colorOrder: Color[] = [0, 1, 2, 3];

const mapColorToClass = {
  [Color.red]: "bgc-red",
  [Color.green]: "bgc-green",
  [Color.yellow]: "bgc-yellow",
  [Color.blue]: "bgc-blue",
};

const mapRoleToIcon = {
  [Role.knight]: img.knight,
  [Role.queen]: img.queen,
  [Role.bishop]: img.bishop,
  [Role.rook]: img.rook,
};
