import { AILevel, GameState } from "@chameleon-chess/logic";
import { PlayerSetup, PlayerType } from "./PlayerSetup";

export type Game = {
    readonly gameState: GameState;
    readonly playerSetup: PlayerSetup;
    readonly aiLevel: AILevel;
};

export function isComputerMove(game: Game): boolean {
    return game.playerSetup[game.gameState.player] === PlayerType.computer;
}
