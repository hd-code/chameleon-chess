import * as React from "react";
import { Color } from "@chameleon-chess/logic";

// -----------------------------------------------------------------------------

interface ButtonProps extends React.ComponentProps<"button"> {
    color_: Color;
}

export const Button: React.FC<ButtonProps> = ({
    children,
    className = "",
    color_,
    ...rest
}) => (
    <button
        className={
            "bc-black border c-white text-border p-1 rounded " +
            mapColorClass[color_ ?? Color.red] +
            (!rest.disabled
                ? " pointer "
                : " overlay overlay-darken forbidden ") +
            className
        }
        {...rest}
    >
        {children}
    </button>
);

// -----------------------------------------------------------------------------

const mapColorClass = {
    [Color.red]: "bgc-red",
    [Color.green]: "bgc-green",
    [Color.yellow]: "bgc-yellow",
    [Color.blue]: "bgc-blue",
};
