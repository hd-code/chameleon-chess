import { Color, PlayerColor, Players, PlayerType } from "chameleon-chess-logic";
import { useState } from "react";

// -----------------------------------------------------------------------------

export interface PlayersState {
    readonly players: Players;
    onClickPlayer: (player: PlayerColor) => void;
}

export function usePlayersState(): PlayersState {
    const [players, setPlayers] = useState(defaultPlayers);

    const onClickPlayer = (player: PlayerColor) => {
        const nextType = mapPlayerTypeToNext[players[player] as PlayerType];
        setPlayers({ ...players, [player]: nextType });
    };

    return { players, onClickPlayer };
}

// -----------------------------------------------------------------------------

const defaultPlayers = {
    [Color.red]: PlayerType.human,
    [Color.green]: PlayerType.none,
    [Color.yellow]: PlayerType.computer,
    [Color.blue]: PlayerType.none,
};

const mapPlayerTypeToNext = {
    [PlayerType.none]: PlayerType.human,
    [PlayerType.human]: PlayerType.computer,
    [PlayerType.computer]: PlayerType.none,
};
