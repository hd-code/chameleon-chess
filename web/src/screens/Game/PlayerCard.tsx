import { Color } from "chameleon-chess-logic";
import * as React from "react";

import { Assets } from "../../Assets";
import { PlayerType } from "../../domain/PlayerSetup";

// -----------------------------------------------------------------------------

interface PlayerProps {
    active: boolean;
    className?: string;
    color: Color;
    dead: boolean;
    type: PlayerType;
}

export const PlayerCard: React.FC<PlayerProps> = ({
    active,
    className = "",
    color,
    dead,
    type,
}) => (
    <div
        className={[
            "border no-select p-05 overlay",
            mapColorToClass[color],
            active ? "overlay-frame" : "",
            dead ? "overlay-darken" : "",
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
    [PlayerType.none]: Assets.img.none,
    [PlayerType.human]: Assets.img.human,
    [PlayerType.computer]: Assets.img.computer,
};
