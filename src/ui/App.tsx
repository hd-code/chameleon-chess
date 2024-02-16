import * as React from "react";
import * as game from "../domain/game";
import { Board } from "./Board";

export const App: React.FC<{}> = () => {
    const board = new game.Board(new game.Bounds(3, 2, 6, 6), [
        [new game.Pawn({ color: "green" }, "yellow"), new game.Position(3, 6)],
        [new game.Pawn({ color: "blue" }, "green"), new game.Position(6, 2)],
        [new game.Pawn({ color: "blue" }, "blue"), new game.Position(4, 3)], // moves
    ]);
    return (
        <div>
            <Board board={board} />
        </div>
    );
};
