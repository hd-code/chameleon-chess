import React, { FC } from "react";

// -----------------------------------------------------------------------------

type DivAttributes = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export const Logo: FC<DivAttributes> = ({ className, ...rest }) => (
  <div
    className={(className ?? "") + " text-center bold text-border"}
    {...rest}
  >
    {text.split("").map((char, i) =>
      char === "\n" ? (
        <br key={i} />
      ) : (
        <span key={i} className={colors[i % colors.length]}>
          {char}
        </span>
      ),
    )}
  </div>
);

// -----------------------------------------------------------------------------

const text = "Chamäleon\nSchach";

const colors = ["c-red", "c-green", "c-yellow", "c-blue"];
