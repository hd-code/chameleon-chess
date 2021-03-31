import React, { FC } from 'react';

import { AppState } from 'core/state';

import Button from 'web/shared/button';

// -----------------------------------------------------------------------------

const component: FC<AppState> = props => {
    return (
        <div className='text-center'>
            <p className='c-white text-border mb-1'>Settings works!</p>
            <Button onClick={() => props.goTo.home()}>Back</Button>
        </div>
    );
};
export default component;
