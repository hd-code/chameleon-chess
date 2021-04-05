import React, { FC } from 'react';

import { Text } from './text';

// -----------------------------------------------------------------------------

interface SelectButtonsProps {
    options: {
        disabled?: boolean;
        label?: string;
        value: string;
    }[];
    selected?: string;
    onSelect: (value: string) => void;
}

export const SelectButtons: FC<SelectButtonsProps> = ({ options, selected, onSelect }) => {
    return (
        <div className='flex center'>
            {options.map((option, i) => (
                <button
                    className={
                        'p-1 border transparent-80 ' +
                        (i === 0 ? 'rounded-left ' : '') +
                        (i + 1 === options.length ? 'rounded-right ' : '') +
                        (selected === option.value ? 'bgc-white ' : 'bgc-transparent c-white ') +
                        (option.disabled ? 'overlay-dark forbidden ' : 'pointer ')
                    }
                    disabled={option.disabled}
                    key={i}
                    onClick={() => !option.disabled && onSelect(option.value)}
                >
                    <Text>{option.label ?? option.value}</Text>
                </button>
            ))}
        </div>
    );
};
