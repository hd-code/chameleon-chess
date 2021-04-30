import React, { FC } from "react";

// -----------------------------------------------------------------------------

interface TextProps {
  className?: string;
  tag?: "h1" | "h2" | "h3" | "p" | "span";
}

export const Text: FC<TextProps> = ({
  children,
  className,
  tag: Tag = "span",
}) => (
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
