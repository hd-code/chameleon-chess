import React, { useState } from 'react';

import Field, { FieldProps, FieldState } from './field';
import Pawn from './pawn';

import { GameState as GameStateModel, Position, getBoard, getPawnIndexAtPosition, getMoves, isWithinLimits } from 'models/game-state';
import { getCurrentGameState } from 'models/game';
import { GameState } from 'state/game';

// -----------------------------------------------------------------------------

export interface BoardProps extends GameState {}

export default function Board(props: BoardProps) {
    const [selectedPawnI, setSelected] = useState(-1);

    const gs = getCurrentGameState(props.game);

    const fields = makeFields(gs, selectedPawnI);
    const pawns = gs.pawns.map((pawn, i) => ({ ...pawn, selected: i === selectedPawnI }));

    const onClick = (event: React.MouseEvent) => {
        const clickPos = getClickPosition(event);
        const clickedPawnI = getPawnIndexAtPosition(clickPos, gs.pawns);
        clickedPawnI !== null && setSelected(clickedPawnI);
        selectedPawnI !== -1 && props.makeMove(selectedPawnI, clickPos) && setSelected(-1);
    };

    props.onNextTurn();

    return <div className='square overlay-parent'>
        <div className='overlay flex wrap'>
            {fields.map((field, i) => <Field key={i} {...field} />)}
            {pawns.map(pawn => <Pawn {...pawn} />)}
        </div>
        <div className='overlay' onClick={onClick}></div>
    </div>;
}

// -----------------------------------------------------------------------------

const fieldColors = getBoard();

function makeFields(gs: GameStateModel, pawnIndex: number): FieldProps[] {
    const result: FieldProps[] = [];
    for (let i = 0, ie = fieldColors.length; i < ie; i++) {
        for (let j = 0, je = fieldColors[i].length; j < je; j++) {
            result.push({
                color: fieldColors[i][j],
                state: isWithinLimits({row: i, col: j}, gs.limits) ? FieldState.normal : FieldState.disabled
            });
        }
    }

    if (pawnIndex !== -1) {
        const marked = getMoves(pawnIndex, gs.pawns, gs.limits);
        marked.forEach(({row, col}) => result[row * 8 + col].state = FieldState.marked);
    }

    return result;
}

// -----------------------------------------------------------------------------

function getClickPosition(event: React.MouseEvent): Position {
    const { x, y } = calcRelativeClickPosition(event);
    return { row: Math.floor(y * 8), col: Math.floor(x * 8) };
}

function calcRelativeClickPosition(event: React.MouseEvent): { x: number, y: number } {
    const rect = (event.target as Element).getBoundingClientRect();
    return {
        x: event.nativeEvent.offsetX / rect.width,
        y: event.nativeEvent.offsetY / rect.height,
    };
}