import { FieldColor, getBoard, getFieldColor, isInPositions, isSamePosition, sortPositions } from 'models/game-state/board';

// -----------------------------------------------------------------------------

describe('models/game-state/board', () => {
    describe(getFieldColor.name, () => {
        test.each([
            [ 0, 0, FieldColor.blue ],
            [ 3, 2, FieldColor.green ],
            [ 7, 0, FieldColor.red ],
            [ 7, 1, FieldColor.green ],
            [ 7, 2, FieldColor.yellow ],
            [ 7, 3, FieldColor.blue ],
        ])('row: %i, col: %i, expect: %s', (row, col, expected) => {
            expect(getFieldColor({row,col})).toBe(expected);
        });
    });

    describe(getBoard.name, () => {
        const board = getBoard();
        test('should have 8 rows', () => expect(board).toHaveLength(8));
        test('should have 8 columns', () => board.forEach(row => expect(row).toHaveLength(8)));
        test('should only contain integers from 0 to 7', () => {
            board.forEach(row => row.forEach(val => expect(val+'').toMatch(/[0-7]/)));
        });
    });

    describe(isInPositions.name, () => {
        test.each([
            [ {row:0,col:0}, [{row:0,col:0},{row:1,col:1}], true ],
            [ {row:1,col:1}, [{row:0,col:0},{row:1,col:1}], true ],
            [ {row:1,col:0}, [{row:0,col:0},{row:1,col:1}], false ],
            [ {row:6,col:4}, [], false ],
            [ {row:2,col:5}, [{row:2,col:5}], true ],
            [ {row:2,col:5}, [{row:2,col:4}], false ],
            [ {row:2,col:5}, [{row:3,col:5}], false ],
        ])('%o in %j, expect: %j', (position, positions, expected) => {
            const actual = isInPositions(position, positions);
            expect(actual).toBe(expected);
        });
    });

    describe(isSamePosition.name, () => {
        test.each([
            [ { row: 0, col: 0 }, { row: 0, col: 0 }, true ],
            [ { row: 3, col: 3 }, { row: 3, col: 3 }, true ],
            [ { row: 6, col: 3 }, { row: 6, col: 3 }, true ],
            [ { row: 6, col: 3 }, { row: 1, col: 1 }, false ],
            [ { row: 6, col: 6 }, { row: 1, col: 1 }, false ],
            [ { row: 5, col: 5 }, { row: 2, col: 3 }, false ],
            [ { row: 5, col: 5 }, { row: 5, col: 3 }, false ],
            [ { row: 1, col: 3 }, { row: 5, col: 3 }, false ],
        ])('%o and %o, expect: %j', (position, positions, expected) => {
            const actual = isSamePosition(position, positions);
            expect(actual).toBe(expected);
        });
    });

    describe(sortPositions.name, () => {
        test.each([
            [ 'just one position', [{row:3,col:5}], [{row:3,col:5}] ],
            [ 'two positions, rows not sorted', [{row:7,col:5},{row:3,col:5}], [{row:3,col:5},{row:7,col:5}] ],
            [ 'two positions, rows sorted already', [{row:3,col:5},{row:7,col:5}], [{row:3,col:5},{row:7,col:5}] ],
            [ 'two positions, rows are equal, cols not sorted', [{row:2,col:5},{row:2,col:3}], [{row:2,col:3},{row:2,col:5}] ],
            [ 'two positions, rows are equal, cols sorted', [{row:2,col:3},{row:2,col:5}], [{row:2,col:3},{row:2,col:5}] ],
        ])('%s', (_, input, expected) => {
            input.sort(sortPositions);
            expect(input).toEqual(expected);
        });
    });
});