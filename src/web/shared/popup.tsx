import React, { FC } from "react";

// -----------------------------------------------------------------------------

interface PopupProps {
  className?: string;
  onClose?: () => void;
}

export const Popup: FC<PopupProps> = ({
  className = "",
  children,
  onClose,
}) => (
  <div className="cover-screen bgc-darken flex center middle">
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
