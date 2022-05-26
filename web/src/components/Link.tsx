import * as React from "react";

import { Text } from "./Text";

// -----------------------------------------------------------------------------

interface LinkProps {
    children: string;
    className?: string;
    onClick?: () => void;
}

export const Link: React.FC<LinkProps> = ({
    children,
    className = "",
    onClick,
}) => (
    <a
        className={`c-white no-select one-line pointer underline ${className}`}
        onClick={onClick}
    >
        <Text>{children}</Text>
    </a>
);
