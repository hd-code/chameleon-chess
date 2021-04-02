import React, { FC } from 'react';

// -----------------------------------------------------------------------------

interface PopupProps {
    onClose?: () => void;
}

export const Popup: FC<PopupProps> = ({ children, onClose }) => (
    <div className='overlay-screen bgc-darken flex center middle'>
        <div className='c-white'>
            {onClose && (
                <div className='text-right fz-200'>
                    <a onClick={onClose}>X</a>
                </div>
            )}
            {children}
        </div>
    </div>
);
