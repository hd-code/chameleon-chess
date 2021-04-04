import { useState } from 'react';

// -----------------------------------------------------------------------------

export interface Settings {
    language: string;
    music: boolean;
    sounds: boolean;
}

export interface SettingsState {
    settings: Settings;
}

export function useSettings(): SettingsState {
    const [settings] = useState(defaultSettings);

    return {
        settings,
    };
}

// -----------------------------------------------------------------------------

const defaultSettings: Settings = {
    language: 'de',
    music: true,
    sounds: true,
};
