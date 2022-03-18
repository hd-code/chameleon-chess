import * as React from "react";
import { Text } from "./Text";

// -----------------------------------------------------------------------------

interface SelectButtonsProps<T extends string> {
    options: T[];
    selected?: T;
    onSelect: (value: T) => void;
}

export function SelectButtons<T extends string>({
    options,
    selected,
    onSelect,
}: SelectButtonsProps<T>): JSX.Element {
    return (
        <div className="flex">
            {options.map((option, i) => (
                <button
                    className={
                        "p-1 border opacity-80 " +
                        (i === 0 ? "rounded-left " : "") +
                        (i + 1 === options.length ? "rounded-right " : "") +
                        (option === selected
                            ? "bgc-white "
                            : "bgc-transparent c-white pointer")
                    }
                    key={i}
                    onClick={() => option != selected && onSelect(option)}
                >
                    <Text>{option}</Text>
                </button>
            ))}
        </div>
    );
}
