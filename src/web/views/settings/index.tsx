import React, { FC } from 'react';

import { AppState } from 'core/state';
import { Link } from 'web/shared/link';

// -----------------------------------------------------------------------------

export const Settings: FC<AppState> = ({ goBack }) => {
    return (
        <div className='text-center'>
            <p className='c-white text-border mb-1'>Einstellungen sind noch nicht verfügbar.</p>
            <Link onClick={() => goBack()}>zurück</Link>
        </div>
    );
};
