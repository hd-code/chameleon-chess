import React from 'react';

// -----------------------------------------------------------------------------

interface PopupProps {
    children?: JSX.Element;
    onClose?: () => void;
}

export default function Popup(props: PopupProps): JSX.Element {
    return <div className='overlay-screen bgc-darken flex center middle'>
        <div className='c-white'>
            {props.onClose && <div className='text-right fz-200'><a onClick={props.onClose}>X</a></div>}
            {props.children}
        </div>
    </div>;
}