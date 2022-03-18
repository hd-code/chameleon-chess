import React, { FC } from "react";

import { Text } from "./text";

// -----------------------------------------------------------------------------

interface LinkProps {
  className?: string;
  onClick?: () => void;
}

export const Link: FC<LinkProps> = ({ children, className, onClick }) => (
  <a
    className={`c-white no-select one-line pointer underline ${
      className ?? ""
    }`}
    onClick={onClick}
  >
    <Text>{children}</Text>
  </a>
);
