import { Player } from './game-state';

// -----------------------------------------------------------------------------

export enum PlayerType { none, human, computer }

export type Players = {[player in Player]: PlayerType}