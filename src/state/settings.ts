import { useState } from 'react';

import Storage from 'storage';

// -----------------------------------------------------------------------------

export interface SettingsState {
    settings: unknown;
}

export function useSettings(storage: Storage): SettingsState {
    const [settings, setSettings] = useState(null);

    storage.read<unknown>(storageKey)
        .then(data => !!data && setSettings(data))
        .catch(console.info);

    return {
        settings
    };
}

// -----------------------------------------------------------------------------

const storageKey = 'settings';