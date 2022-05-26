// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from "react";

import { Text } from "./Text";

// -----------------------------------------------------------------------------

interface SelectButtonsProps<T> {
    options: {
        value: T;
        label: string;
    }[];
    selected?: T;
    onSelect: (value: T) => void;
}

export function SelectButtons<T>({
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
                        (option.value === selected
                            ? "bgc-white "
                            : "bgc-transparent c-white pointer")
                    }
                    key={i}
                    onClick={() =>
                        option.value != selected && onSelect(option.value)
                    }
                >
                    <Text>{option.label}</Text>
                </button>
            ))}
        </div>
    );
}
