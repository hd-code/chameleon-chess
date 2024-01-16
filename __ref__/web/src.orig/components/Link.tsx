import * as React from "react";

// -----------------------------------------------------------------------------

interface LinkProps {
    className?: string;
    onClick?: () => void;
}

export const Link: React.FC<React.PropsWithChildren<LinkProps>> = ({
    children,
    className = "",
    onClick,
}) => (
    <a
        className={`c-white no-select one-line pointer underline ${className}`}
        onClick={onClick}
    >
        {children}
    </a>
);
