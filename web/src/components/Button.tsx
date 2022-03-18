import { Color } from "chameleon-chess-logic";
import * as React from "react";
import { Text } from "./Text";

// -----------------------------------------------------------------------------

interface ButtonProps {
    className?: string;
    color?: Color;
    disabled?: boolean;
    onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
    children,
    className,
    color,
    ...rest
}) => (
    <button
        className={
            "bc-black border c-white text-border p-1 rounded " +
            mapColorClass[color ?? Color.red] +
            (!rest.disabled
                ? " pointer "
                : " overlay overlay-darken forbidden ") +
            className
        }
        {...rest}
    >
        <Text>{children}</Text>
    </button>
);

// -----------------------------------------------------------------------------

const mapColorClass = {
    [Color.red]: "bgc-red",
    [Color.green]: "bgc-green",
    [Color.yellow]: "bgc-yellow",
    [Color.blue]: "bgc-blue",
};
