import { render } from '../render';
import storage from '../storage';

import { ELanguage } from '../models/language';
import { ISettings, isSettings, IChangeSettings } from '../models/settings';

// -----------------------------------------------------------------------------

/** Returns the current settings. */
export function getSettings() {
    return settings;
}

/** Returns the functions to alter the settings. */
export function getSettingsChanger() {
    return settingsChanger;
}

// -----------------------------------------------------------------------------

const storageKey = 'settings';

let settings: ISettings = {
    language: ELanguage.GERMAN,
    musicOn: true,
    soundOn: true,
};

const settingsChanger: IChangeSettings = {
    setLanguage: (newLang: ELanguage) => {
        settings.language = newLang;
        render();
        saveSettings();
    },
    toggleMusicOn: () => {
        settings.musicOn = !settings.musicOn;
        render();
        saveSettings();
    },
    toggleSoundOn: () => {
        settings.soundOn = !settings.soundOn;
        render();
        saveSettings();
    },
};

async function saveSettings() {
    await storage.write(storageKey, settings);
}

async function loadSettings() {
    const storedSettings = await storage.read(storageKey);

    if (isSettings(storedSettings)) {
        settings = storedSettings;
    } else {
        // Save default settings if none were available.
        saveSettings();
    }
}

// -----------------------------------------------------------------------------

// Load settings the first time this file is retrieved.
loadSettings().then(render).catch(e => console.log(e));