import { Color } from "@chameleon-chess/logic";

// -----------------------------------------------------------------------------

export enum PlayerType {
    none,
    human,
    computer,
}

export type PlayerSetup = { [player in Color]: PlayerType };

export function getDefaultPlayerSetup(): PlayerSetup {
    return {
        [Color.red]: PlayerType.human,
        [Color.green]: PlayerType.none,
        [Color.yellow]: PlayerType.computer,
        [Color.blue]: PlayerType.none,
    };
}

export function isValidPlayerSetup(playerSetup: PlayerSetup): boolean {
    let numOfPlayers = 0;
    playerSetup[Color.red] !== PlayerType.none && numOfPlayers++;
    playerSetup[Color.green] !== PlayerType.none && numOfPlayers++;
    playerSetup[Color.yellow] !== PlayerType.none && numOfPlayers++;
    playerSetup[Color.blue] !== PlayerType.none && numOfPlayers++;
    return numOfPlayers >= 2;
}

export function updatePlayerSetup(
    orig: PlayerSetup,
    player: Color,
): PlayerSetup {
    const result = { ...orig };
    result[player] = mapPlayerTypeToNext[result[player]];
    return result;
}

// -----------------------------------------------------------------------------

const mapPlayerTypeToNext = {
    [PlayerType.none]: PlayerType.human,
    [PlayerType.human]: PlayerType.computer,
    [PlayerType.computer]: PlayerType.none,
};
