import React from "react";

import { Text } from "./text";

// -----------------------------------------------------------------------------

interface SelectButtonsProps<T> {
  options: {
    disabled?: boolean;
    label?: string;
    value: T | string;
  }[];
  selected?: T | string;
  onSelect: (value: T | string) => void;
}

export function SelectButtons<T>({
  options,
  selected,
  onSelect,
}: SelectButtonsProps<T>): JSX.Element {
  return (
    <div className="flex center">
      {options.map((option, i) => (
        <button
          className={
            "p-1 border opacity-80" +
            (i === 0 ? " rounded-left " : "") +
            (i + 1 === options.length ? " rounded-right" : "") +
            (selected === option.value
              ? " bgc-white"
              : " bgc-transparent c-white") +
            (option.disabled ? " overlay-dark forbidden" : " pointer")
          }
          disabled={option.disabled}
          key={i}
          onClick={() => !option.disabled && onSelect(option.value)}
        >
          <Text>{option.label ?? (option.value as string)}</Text>
        </button>
      ))}
    </div>
  );
}
