import * as React from "react";

// -----------------------------------------------------------------------------

interface LinkIconProps {
    onClick: () => void;
    src: string;
}

export const LinkIcon: React.FC<LinkIconProps> = ({ onClick, src }) => (
    <div className="p-1" style={{ width: "3em" }} onClick={onClick}>
        <img className="pointer" src={src} alt="" />
    </div>
);
