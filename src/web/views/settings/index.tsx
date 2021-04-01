import React, { FC } from 'react';

import { AppState } from 'core/state';
import Link from 'web/shared/link';

// -----------------------------------------------------------------------------

const component: FC<AppState> = props => {
    return (
        <div className='text-center'>
            <p className='c-white text-border mb-1'>Settings works!</p>
            <Link onClick={() => props.goBack()}>Back</Link>
        </div>
    );
};
export default component;
