import React, { FC } from 'react';

// -----------------------------------------------------------------------------

const component: FC<{ src: string; onClick: () => void }> = props => {
    return (
        <div className='p-1' style={{ width: '3em' }} onClick={props.onClick}>
            <img className='pointer' src={props.src} alt='' />
        </div>
    );
};
export default component;
