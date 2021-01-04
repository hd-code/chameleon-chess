import React from 'react';

// -----------------------------------------------------------------------------

type DivAttributes = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

interface LogoProps extends DivAttributes {}

export default function Logo(props: LogoProps): JSX.Element {
    const {className, ...rest} = props;
    return <div className={(className ?? '') + ' text-center bold text-border'} {...rest}>
        {text.split('').map((char, i) => char === '\n'
            ? <br /> : <span className={colors[i % colors.length]}>{char}</span>
        )}
    </div>;
}

// -----------------------------------------------------------------------------

const text = 'Chamäleon\nSchach';

const colors = ['c-red','c-green','c-yellow','c-blue'];