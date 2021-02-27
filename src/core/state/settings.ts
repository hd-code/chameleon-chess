import { useState } from 'react';

import Storage from '../storage';

// -----------------------------------------------------------------------------

export interface Settings {
    language: string;
    music: boolean;
    sounds: boolean;
}

// -----------------------------------------------------------------------------

export interface SettingsState {
    settings: Settings;
}

export function useSettings(storage: Storage): SettingsState {
    const [settings, setSettings] = useState(defaultSettings);

    storage.read<Settings>(storageKey)
        .then(data => !!data && setSettings(data))
        .catch(console.info);

    return {
        settings,
    };
}

// -----------------------------------------------------------------------------

const storageKey = 'settings';

const defaultSettings: Settings = {
    language: 'de',
    music: true,
    sounds: true,
};
