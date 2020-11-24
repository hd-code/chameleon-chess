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
            board.forEach(row => row.forEach(val => expect(val+'').toMatch(/[0-7]/)))
        });
    });

    test.todo(isInPositions.name);
    test.todo(isSamePosition.name);
    test.todo(sortPositions.name);
});