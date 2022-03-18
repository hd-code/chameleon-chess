/** All existing views in the app. */
export enum EView { HOME, GAME, GAME_CONFIG, SETTINGS };

/** Interface for navigation functions. Gets implemented by the view controller. */
export interface INavigation {
    home: () => void;
    game: () => void;
    gameConfig: () => void;
    settings: () => void;
}