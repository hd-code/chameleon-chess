import React, { FC } from 'react';

// -----------------------------------------------------------------------------

const component: FC<{onClose?: () => void}> = (props) => {
    return <div className='overlay-screen bgc-darken flex center middle'>
        <div className='c-white'>
            {props.onClose && <div className='text-right fz-200'><a onClick={props.onClose}>X</a></div>}
            {props.children}
        </div>
    </div>;
};
export default component;
