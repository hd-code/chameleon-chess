import {
    Color,
    Pawn as PawnData,
    Role,
    getPawnRoles,
} from "chameleon-chess-logic";
import * as React from "react";

import { Assets } from "../../Assets";

// -----------------------------------------------------------------------------

interface PawnProps extends PawnData {
    selected: boolean;
}

export const Pawn: React.FC<PawnProps> = (props) => {
    const offset = {
        left: props.position.col * 12.5 + "%",
        top: props.position.row * 12.5 + "%",
    };
    const roles = getPawnRoles(props);

    return (
        <div
            className="hw-12 flex flex-x-center flex-y-center absolute transition no-select"
            style={offset}
        >
            <div
                className={
                    "hw-75 border rounded flex flex-x-center flex-y-center " +
                    mapColorToClass[props.player] +
                    (props.selected ? " overlay overlay-brighten" : "")
                }
            >
                <div className="hw-75 flex flex-wrap">
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
    [Role.knight]: Assets.img.knight,
    [Role.queen]: Assets.img.queen,
    [Role.bishop]: Assets.img.bishop,
    [Role.rook]: Assets.img.rook,
};
