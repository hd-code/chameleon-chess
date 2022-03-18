import React, { useState } from 'react';
import { LayoutChangeEvent, GestureResponderEvent, ScrollView, StyleSheet, 
        TouchableWithoutFeedback, View, ViewStyle } from 'react-native';

import { playAudio } from '../../assets';

import * as ccl from 'chameleon-chess-logic';
import { isOffLimits, isInMoves } from '../../models/game';

import Field, { FieldProps } from './Field';
import Pawn, { PawnProps } from './Pawn';

// -----------------------------------------------------------------------------

interface BoardProps {
    /** The current game state. */
    game: ccl.IGameState;
    /** Gets called when the board is clicked. Returns true if a move was made,
     * false if it stays the same. */
    onPressBoard: (pawnIndex: number, clickPos: ccl.IPosition) => boolean;
}

/** The game board with the fields and the pawns in play. */
const Board = ({game, onPressBoard}: BoardProps) => {
    const [selectedPawn, selectPawn] = useState(-1);

    const moves = ccl.getMoves(game, selectedPawn);
    const fields = getFieldProps(game.limits, moves);
    const pawns = getPawnProps(game.pawns, selectedPawn);

    function handlePress(event: GestureResponderEvent) {
        const clickPos = calcClickPosition(event);

        // move was made
        if (onPressBoard(selectedPawn, clickPos)) {
            playAudio.drag();
            selectPawn(-1);
        }

        // no move was made
        else {
            const pawnOnField = ccl.getIndexOfPawnAtPosition(game, clickPos);
            if (pawnOnField !== -1) playAudio.tap(); // pawn was tapped

            selectPawn(pawnOnField);
        }
    }

    return <ScrollView style={scrollViewStyle} maximumZoomScale={2}>
        <View style={boardStyle}>
            {fields.map(field => <Field {...field} />)}
            {pawns.map(pawn => <Pawn {...pawn} />)}
            <TouchableWithoutFeedback onLayout={measureBoardSize} onPress={handlePress} >
                <View style={StyleSheet.absoluteFill} />
            </TouchableWithoutFeedback>
        </View>
    </ScrollView>;
};

export default Board;

// -----------------------------------------------------------------------------

const scrollViewStyle: ViewStyle = {
    height: '100%',
    width: '100%',
};

const boardStyle: ViewStyle = {
    aspectRatio: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
};

const board = ccl.getBoard();

/** stores the dimensions of the board as soon as they are available */
let boardDimensions = { height: 0, width: 0 };

/** measures the board size, when it is available (react-native onLayout event)
 * and stores them in the local variable `boardDimensions` */
function measureBoardSize(event: LayoutChangeEvent) {
    boardDimensions.height = event.nativeEvent.layout.height;
    boardDimensions.width = event.nativeEvent.layout.width;
}

/** Calculates the click position on the board. This is only possible after the
 * board has been measured! */
function calcClickPosition(event: GestureResponderEvent): ccl.IPosition {
    const {locationX, locationY} = event.nativeEvent;
    return {
        col: Math.floor(locationX / boardDimensions.width * 8),
        row: Math.floor(locationY / boardDimensions.height * 8),
    };
}

function getFieldProps(limits: ccl.ILimits, moves: ccl.IPosition[]): FieldProps[] {
    const tmpResult: FieldProps[][] = board.map((row, i) => row.map((fieldColor, j) => (
        {
            key: i + '' + j,
            color: fieldColor,
            isOffLimits: isOffLimits(i, j, limits),
            isTarget: isInMoves(i, j, moves),
        }
    )));

    return tmpResult.reduce((result, row) => result.concat(row), []);
}

function getPawnProps(pawns: ccl.IPawn[], selectedPawn: number): PawnProps[] {
    return pawns.map((pawn, i) => ({
        ...pawn,
        key: pawn.player + '' + pawn.roles[0],
        selected: i === selectedPawn,
    }));
}