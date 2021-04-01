import React, { FC } from 'react';

import { Color } from 'core/game-state';
import Text from 'web/shared/text';

// -----------------------------------------------------------------------------

interface ButtonProps {
    className?: string;
    color?: Color;
    disabled?: boolean;
    onClick?: () => void;
}

const component: FC<ButtonProps> = props => {
    const { children, className, color, ...rest } = props;

    const baseClasses = 'c-white text-border border p-1 rounded';
    const colorClasses = mapColorClass[color ?? Color.red];
    const disabledClasses = !props.disabled ? 'pointer' : 'overlay-dark forbidden';
    const classes = `${baseClasses} ${colorClasses} ${disabledClasses} ${className}`;

    return (
        <button {...rest} className={classes}>
            <Text>{children}</Text>
        </button>
    );
};
export default component;

// -----------------------------------------------------------------------------

const mapColorClass = {
    [Color.red]: 'bgc-red',
    [Color.green]: 'bgc-green',
    [Color.yellow]: 'bgc-yellow',
    [Color.blue]: 'bgc-blue',
};
