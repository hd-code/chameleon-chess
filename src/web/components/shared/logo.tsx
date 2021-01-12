import React, { FC } from 'react';

// -----------------------------------------------------------------------------

type DivAttributes = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

const component: FC<DivAttributes> = ({className, ...rest}) => {
    return <div className={(className ?? '') + ' text-center bold text-border'} {...rest}>
        {text.split('').map((char, i) => char === '\n'
            ? <br /> : <span className={colors[i % colors.length]}>{char}</span>,
        )}
    </div>;
};

export default component;

// -----------------------------------------------------------------------------

const text = 'Chamäleon\nSchach';

const colors = ['c-red','c-green','c-yellow','c-blue'];
