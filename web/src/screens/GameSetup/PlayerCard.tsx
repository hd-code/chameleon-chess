import { Assets } from "Assets";
import { Color, PlayerColor, PlayerType } from "chameleon-chess-logic";
import { Text } from "components";
import * as React from "react";

// -----------------------------------------------------------------------------

interface PlayerCardProps {
    className?: string;
    color: PlayerColor;
    onClick: () => void;
    type: PlayerType;
}

export const PlayerCard: React.FC<PlayerCardProps> = ({
    className = "",
    color,
    ...props
}) => (
    <div
        className={`w-5em border no-select pointer py-1 text-center ${mapColorToClass[color]} ${className}`}
        onClick={props.onClick}
    >
        <img className="w-66" src={mapTypeToImg[props.type]} alt="" />
        <Text className="one-line" tag="p">
            {PlayerType[props.type]}
        </Text>
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
