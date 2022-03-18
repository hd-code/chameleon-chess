/** The supported languages of the app. */
export enum ELanguage {
    ENGLISH = 'en',
    GERMAN = 'de',
}

/** TypeGuard for ELanguage */
export function isLanguage(lang: any): lang is ELanguage {
    return typeof lang === 'string';
}

/** Returns the names of the languages in the languages. */
export function getLanguageDescriptions() {
    return LANGUAGE_DESCRIPTIONS;
}

// -----------------------------------------------------------------------------

const LANGUAGE_DESCRIPTIONS = {
    [ELanguage.ENGLISH]: 'english',
    [ELanguage.GERMAN]: 'deutsch',
}