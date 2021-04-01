import React, { FC } from 'react';

// -----------------------------------------------------------------------------

interface TextProps {
    className?: string;
    type?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}

const component: FC<TextProps> = props => {
    const Tag = props.type ?? 'span'; // eslint-disable-line @typescript-eslint/naming-convention
    const children = (typeof props.children === 'string' && de[props.children]) || props.children;
    return <Tag className={props.className}>{children}</Tag>;
};
export default component;

// -----------------------------------------------------------------------------

const de: { [key: string]: string } = {
    computer: 'KI',
    human: 'Mensch',
    none: 'Keiner',
};
