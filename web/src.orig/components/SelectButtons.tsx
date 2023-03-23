// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from "react";

// -----------------------------------------------------------------------------

interface SelectButtonsProps<T> {
    className?: string;
    options: {
        value: T;
        label: string;
    }[];
    selected?: T;
    onSelect: (value: T) => void;
}

export function SelectButtons<T>({
    className = "",
    options,
    selected,
    onSelect,
}: SelectButtonsProps<T>): JSX.Element {
    return (
        <div className={`flex ${className}`}>
            {options.map((option, i) => (
                <button
                    className={
                        "p-1 border no-select " +
                        (i === 0 ? "rounded-left " : "no-border-l ") +
                        (i + 1 === options.length ? "rounded-right " : "") +
                        (option.value === selected
                            ? "bgc-white"
                            : "bgc-transparent c-white pointer")
                    }
                    key={i}
                    onClick={() =>
                        option.value != selected && onSelect(option.value)
                    }
                >
                    {option.label}
                </button>
            ))}
        </div>
    );
}
