import React, { FC } from 'react';

// -----------------------------------------------------------------------------

interface TextProps {
    className?: string;
    type?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}

const component: FC<TextProps> = props => {
    const Tag = props.type ?? 'span'; // eslint-disable-line @typescript-eslint/naming-convention
    return <Tag className={props.className}>{props.children}</Tag>;
};
export default component;
