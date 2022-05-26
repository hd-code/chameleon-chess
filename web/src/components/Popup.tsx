import * as React from "react";

// -----------------------------------------------------------------------------

interface PopupProps {
    children: JSX.Element | JSX.Element[];
    className?: string;
    onClose?: () => void;
}

export const Popup: React.FC<PopupProps> = ({
    className = "",
    children,
    onClose,
}) => (
    <div className="cover-screen bgc-darken flex flex-x-center flex-y-center">
        <div className={`c-white ${className}`}>
            {onClose && (
                <div className="text-right fz-200">
                    <a onClick={onClose}>X</a>
                </div>
            )}
            {children}
        </div>
    </div>
);
