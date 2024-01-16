import * as React from "react";

// -----------------------------------------------------------------------------

export const Logo: React.FC<React.ComponentProps<"div">> = ({ className = "", ...rest }) => (
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
