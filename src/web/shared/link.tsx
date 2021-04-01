import React, { FC } from 'react';

import Text from './text';

// -----------------------------------------------------------------------------

interface LinkProps {
    className?: string;
    onClick?: () => void;
}

const component: FC<LinkProps> = props => {
    return (
        <a className={`c-white no-select one-line pointer underline ${props.className ?? ''}`} onClick={props.onClick}>
            <Text>{props.children}</Text>
        </a>
    );
};
export default component;
