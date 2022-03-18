import { ELanguage, isLanguage } from './language';

// -----------------------------------------------------------------------------

/** The global settings for the app. */
export interface ISettings {
    /** The language for all displayed texts. */
    language: ELanguage;
    /** Tells if music should be played. */
    musicOn: boolean;
    /** Tells if sounds should be played. */
    soundOn: boolean;
}

/** TypeGuard for ISettings */
export function isSettings(s: any): s is ISettings {
    return typeof s === 'object' && s !== null
        && 'language' in s && isLanguage(s.language)
        && 'musicOn' in s && typeof s.musicOn === 'boolean'
        && 'soundOn' in s && typeof s.soundOn === 'boolean'
    ;
}

/** Interface that gives functions to alter the settings. Is implemented by the
 * settings controller. */
export interface IChangeSettings {
    setLanguage: (language: ELanguage) => void;
    toggleMusicOn: () => void;
    toggleSoundOn: () => void;
}