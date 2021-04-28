import React, { FC } from "react";

// -----------------------------------------------------------------------------

interface TextProps {
  className?: string;
  Tag?: "h1" | "h2" | "h3" | "p" | "span"; // eslint-disable-line @typescript-eslint/naming-convention
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Text: FC<TextProps> = ({ children, className, Tag = "span" }) => (
  // eslint-disable-next-line @typescript-eslint/naming-convention
  <Tag className={className}>
    {(typeof children === "string" && de[children]) || children}
  </Tag>
);

// -----------------------------------------------------------------------------

const de: { [key: string]: string } = {
  red: "Rot",
  green: "Grün",
  yellow: "Gelb",
  blue: "Blau",

  computer: "KI",
  human: "Mensch",
  none: "Keiner",
};
