import * as React from "react";
import * as game from "../domain/game";

interface BoardProps {
    board: game.Board;
}

export const Board: React.FC<BoardProps> = ({ board }) => {
    return (
        <div className="board">
            {board.fields.map((row, i) =>
                row.map((field, j) => (
                    <div
                        key={i + "-" + j}
                        className={"field bg-" + field.color}
                    />
                )),
            )}
            {board.pawns.map((pawn) => (
                <div
                    key={pawn.player + "-" + pawn.knightColor}
                    className={"pawn bg-" + pawn.player.color}
                    style={{
                        left: (pawn.position.x * 100) / 8 + 1 + "%",
                        top: (pawn.position.y * 100) / 8 + 1 + "%",
                    }}
                />
            ))}
        </div>
    );
};
