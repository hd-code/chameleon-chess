import React, { FC, useState } from "react";

import {
  GameState,
  Pawn as PawnModel,
  Position,
  getBoard,
  getPawnIndexAtPosition,
  getPawnMoves,
  isSamePosition,
  isWithinLimits,
} from "core/game";

import { Field, FieldProps, FieldState } from "./field";
import { Pawn } from "./pawn";

// -----------------------------------------------------------------------------

interface BoardProps {
  gameState: GameState;
  makeMove: (pawnIndex: number, destination: Position) => boolean;
  size: number;
}

export const Board: FC<BoardProps> = ({ gameState, makeMove, size }) => {
  const [selectedPawnI, setSelected] = useState(-1);

  const fields = makeFields(gameState, selectedPawnI);
  const pawns = gameState.pawns.map((pawn, i) => ({
    ...pawn,
    selected: i === selectedPawnI,
  }));

  const onClick = (event: React.MouseEvent) => {
    const clickPos = getClickPosition(event);
    const clickedPawnI = getPawnIndexAtPosition(clickPos, gameState.pawns);

    if (selectedPawnI !== -1) {
      if (isSamePosition(clickPos, gameState.pawns[selectedPawnI].position)) {
        setSelected(-1);
        return;
      }

      const madeMove = makeMove(selectedPawnI, clickPos);
      if (madeMove) {
        setSelected(-1);
        return;
      }
    }

    setSelected(clickedPawnI);
  };

  return (
    <div className="relative" style={{ height: size, width: size }}>
      <div className="cover flex wrap">
        {fields.map((field, i) => (
          <Field key={i} {...field} />
        ))}
        {pawns.map((pawn) => (
          <Pawn key={getPawnKey(pawn)} {...pawn} />
        ))}
        <div className="cover" onClick={onClick}></div>
      </div>
    </div>
  );
};

// -----------------------------------------------------------------------------

const fieldColors = getBoard();

function makeFields(gs: GameState, pawnIndex: number): FieldProps[] {
  const result: FieldProps[] = [];
  for (let i = 0, ie = fieldColors.length; i < ie; i++) {
    for (let j = 0, je = fieldColors[i].length; j < je; j++) {
      result.push({
        color: fieldColors[i][j],
        state: isWithinLimits({ row: i, col: j }, gs.limits)
          ? FieldState.normal
          : FieldState.disabled,
      });
    }
  }

  if (pawnIndex !== -1) {
    const marked = getPawnMoves(pawnIndex, gs.pawns, gs.limits);
    marked.forEach(
      ({ row, col }) => (result[row * 8 + col].state = FieldState.marked),
    );
  }

  return result;
}

// -----------------------------------------------------------------------------

function getClickPosition(event: React.MouseEvent): Position {
  const { x, y } = calcRelativeClickPosition(event);
  return { row: Math.floor(y * 8), col: Math.floor(x * 8) };
}

function calcRelativeClickPosition(
  event: React.MouseEvent,
): { x: number; y: number } {
  const rect = (event.target as Element).getBoundingClientRect();
  return {
    x: event.nativeEvent.offsetX / rect.width,
    y: event.nativeEvent.offsetY / rect.height,
  };
}

// -----------------------------------------------------------------------------

function getPawnKey({ player, knightColor }: PawnModel): string {
  return `${player}${knightColor}`;
}
