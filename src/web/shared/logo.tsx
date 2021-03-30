import React, { FC } from 'react';

// -----------------------------------------------------------------------------

type DivAttributes = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

const component: FC<DivAttributes> = ({ className, ...rest }) => {
    const letters = text.split('').map((char, i) =>
        char === '\n' ? (
            <br key={i} />
        ) : (
            <span key={i} className={colors[i % colors.length]}>
                {char}
            </span>
        ),
    );

    return (
        <div className={(className ?? '') + ' text-center bold text-border'} {...rest}>
            {letters}
        </div>
    );
};
export default component;

// -----------------------------------------------------------------------------

const text = 'Chamäleon\nSchach';

const colors = ['c-red', 'c-green', 'c-yellow', 'c-blue'];
