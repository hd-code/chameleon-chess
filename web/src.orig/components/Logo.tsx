import * as React from "react";

// -----------------------------------------------------------------------------

type DivProps = React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
> & { className?: string };

export const Logo: React.FC<DivProps> = ({ className = "", ...rest }) => (
    <div className={`text-center bold text-border ${className}`} {...rest}>
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
