import React, { FC, useState } from 'react';

import { getCurrentGameState } from 'core/game';
import * as GS from 'core/game-state';
import { AppState } from 'core/state';

import Field, { FieldProps, FieldState } from './field';
import Pawn from './pawn';

// -----------------------------------------------------------------------------

interface BoardProps extends AppState {
    width: number;
}

const component: FC<BoardProps> = (props) => {
    const [selectedPawnI, setSelected] = useState(-1);

    const gs = getCurrentGameState(props.game);

    const fields = makeFields(gs, selectedPawnI);
    const pawns = gs.pawns.map((pawn, i) => ({ ...pawn, selected: i === selectedPawnI }));

    const onClick = (event: React.MouseEvent) => {
        const clickPos = getClickPosition(event);
        const clickedPawnI = GS.getPawnIndexAtPosition(clickPos, gs.pawns);

        if (selectedPawnI !== -1) {
            const madeMove = props.makeMove(selectedPawnI, clickPos);
            if (madeMove) {
                setSelected(-1);
                return;
            }
        }

        setSelected(clickedPawnI);
    };

    props.onNextTurn();

    return <div style={{width: props.width}}>
        <div className='square overlay-parent'>
            <div className='overlay flex wrap'>
                {fields.map((field, i) => <Field key={i} {...field} />)}
                {pawns.map(pawn => <Pawn key={getPawnKey(pawn)} {...pawn} />)}
            </div>
            <div className='overlay' onClick={onClick}></div>
        </div>
    </div>;
};
export default component;

// -----------------------------------------------------------------------------

const fieldColors = GS.getBoard();

function makeFields(gs: GS.GameState, pawnIndex: number): FieldProps[] {
    const result: FieldProps[] = [];
    for (let i = 0, ie = fieldColors.length; i < ie; i++) {
        for (let j = 0, je = fieldColors[i].length; j < je; j++) {
            result.push({
                color: fieldColors[i][j],
                state: GS.isWithinLimits({row: i, col: j}, gs.limits)
                    ? FieldState.normal : FieldState.disabled,
            });
        }
    }

    if (pawnIndex !== -1) {
        const marked = GS.getMoves(pawnIndex, gs.pawns, gs.limits);
        marked.forEach(({row, col}) => result[row * 8 + col].state = FieldState.marked);
    }

    return result;
}

// -----------------------------------------------------------------------------

function getClickPosition(event: React.MouseEvent): GS.Position {
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

// -----------------------------------------------------------------------------

function getPawnKey({player, knightColor}: GS.Pawn): string {
    return `${player}${knightColor}`;
}
