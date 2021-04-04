import Storage from 'core/storage';

import { GameState, useGame } from './game';
import { SettingsState, useSettings } from './settings';
import { ViewState, useView } from './view';

// -----------------------------------------------------------------------------

export interface AppState extends GameState, SettingsState, ViewState {}

export function useAppState(storage: Storage): AppState {
    return {
        ...useGame(storage),
        ...useSettings(),
        ...useView(),
    };
}
