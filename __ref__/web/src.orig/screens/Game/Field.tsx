import * as React from "react";
import { Color } from "@chameleon-chess/logic";

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

export const Field: React.FC<FieldProps> = ({ color, state }) => (
    <div
        className={`hw-12 border overlay ${mapColorClass[color]} ${mapStateClass[state]}`}
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
    [FieldState.disabled]: "overlay-darken",
    [FieldState.marked]: "overlay-brighten",
};
