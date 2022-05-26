import * as React from "react";

// -----------------------------------------------------------------------------

interface TextProps {
    children?: string | JSX.Element | (string | JSX.Element)[];
    className?: string;
    tag?: "h1" | "h2" | "h3" | "p" | "span";
}

export const Text: React.FC<TextProps> = ({
    children,
    className,
    tag: Tag = "span", // eslint-disable-line @typescript-eslint/naming-convention
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
