import { FieldColor, getBoard, getFieldColor, isFieldColor, isInPositions, isPosition, isSamePosition, sortPositions } from 'models/game-state/board';
import * as assert from 'assert';

// -----------------------------------------------------------------------------

describe('models/game-state/board', () => {
    describe(isFieldColor.name, () => {
        [
            { input: 0, expected: true },
            { input: 1, expected: true },
            { input: 2, expected: true },
            { input: 3, expected: true },
            { input: -1, expected: false },
            { input: 4, expected: false },
            { input: 0.5, expected: false },
            { input: 2.3, expected: false },
            { input: '0', expected: false },
            { input: null, expected: false },
            { input: [], expected: false },
            { input: {}, expected: false },
        ].forEach(({input, expected}) => {
            it(`${JSON.stringify(input)} => ${expected}`, () => {
                const actual = isFieldColor(input);
                assert.strictEqual(actual, expected);
            });
        });
    });

    describe(getFieldColor.name, () => {
        [
            { position: { row: 0, col: 0 }, expected: FieldColor.blue },
            { position: { row: 3, col: 2 }, expected: FieldColor.green },
            { position: { row: 7, col: 0 }, expected: FieldColor.red },
            { position: { row: 7, col: 1 }, expected: FieldColor.green },
            { position: { row: 7, col: 2 }, expected: FieldColor.yellow },
            { position: { row: 7, col: 3 }, expected: FieldColor.blue },
        ].forEach(({ position, expected }) => {
            it(`${JSON.stringify(position)} => ${FieldColor[expected]}`, () => {
                const actual = getFieldColor(position);
                assert.strictEqual(actual, expected);
            });
        });
    });

    describe(getBoard.name, () => {
        const board = getBoard();
        it('should have 8 rows', () => assert.strictEqual(board.length, 8));
        it('should have 8 columns', () => board.forEach(row => assert.strictEqual(row.length, 8)));
        it('should only contain integers from 0 to 7', () => {
            const regex = /[0-7]/;
            board.forEach(row => row.forEach(val => assert.ok(regex.test(val+''))));
        });
    });

    describe(isPosition.name, () => {
        [
            { input: {row:0,col:0}, expected: true },
            { input: {row:2,col:1}, expected: true },
            { input: {row:5,col:2}, expected: true },
            { input: {row:7,col:7}, expected: true },
            { input: {row:6,col:3}, expected: true },
            { input: {row:8,col:3}, expected: false },
            { input: {row:7,col:9}, expected: false },
            { input: {row:-2,col:4}, expected: false },
            { input: {row:2,col:2.4}, expected: false },
            { input: {row:.2,col:.8}, expected: false },
            { input: {row:5}, expected: false },
            { input: {col:3}, expected: false },
            { input: 4, expected: false },
            { input: -1, expected: false },
            { input: 0.5, expected: false },
            { input: 2.3, expected: false },
            { input: '0', expected: false },
            { input: null, expected: false },
            { input: [], expected: false },
            { input: {}, expected: false },
        ].forEach(({input, expected}) => {
            it(`${JSON.stringify(input)} => ${expected}`, () => {
                const actual = isPosition(input);
                assert.strictEqual(actual, expected);
            });
        });
    });

    describe(isInPositions.name, () => {
        [
            { position: {row:0,col:0}, positions: [{row:0,col:0},{row:1,col:1}], expected: true },
            { position: {row:1,col:1}, positions: [{row:0,col:0},{row:1,col:1}], expected: true },
            { position: {row:1,col:0}, positions: [{row:0,col:0},{row:1,col:1}], expected: false },
            { position: {row:6,col:4}, positions: [], expected: false },
            { position: {row:2,col:5}, positions: [{row:2,col:5}], expected: true },
            { position: {row:2,col:5}, positions: [{row:2,col:4}], expected: false },
            { position: {row:2,col:5}, positions: [{row:3,col:5}], expected: false },
        ].forEach(({ position, positions, expected }) => {
            it(`${JSON.stringify(position)} in ${JSON.stringify(positions)} => ${expected}`, () => {
                const actual = isInPositions(position, positions);
                assert.strictEqual(actual, expected);
            });
        });
    });

    describe(isSamePosition.name, () => {
        [
            { pos1: { row: 0, col: 0 }, pos2: { row: 0, col: 0 }, expected: true },
            { pos1: { row: 3, col: 3 }, pos2: { row: 3, col: 3 }, expected: true },
            { pos1: { row: 6, col: 3 }, pos2: { row: 6, col: 3 }, expected: true },
            { pos1: { row: 6, col: 3 }, pos2: { row: 1, col: 1 }, expected: false },
            { pos1: { row: 6, col: 6 }, pos2: { row: 1, col: 1 }, expected: false },
            { pos1: { row: 5, col: 5 }, pos2: { row: 2, col: 3 }, expected: false },
            { pos1: { row: 5, col: 5 }, pos2: { row: 5, col: 3 }, expected: false },
            { pos1: { row: 1, col: 3 }, pos2: { row: 5, col: 3 }, expected: false },
        ].forEach(({ pos1, pos2, expected }) => {
            it(`${JSON.stringify(pos1)} and ${JSON.stringify(pos2)} => ${expected}`, () => {
                const actual = isSamePosition(pos1, pos2);
                assert.strictEqual(actual, expected);
            });
        });
    });

    describe(sortPositions.name, () => {
        [{
            name: 'just one position',
            input: [{row:3,col:5}], expected: [{row:3,col:5}]
        }, {
            name: 'two positions, rows not sorted',
            input: [{row:7,col:5},{row:3,col:5}], expected: [{row:3,col:5},{row:7,col:5}]
        }, {
            name: 'two positions, rows sorted already',
            input: [{row:3,col:5},{row:7,col:5}], expected: [{row:3,col:5},{row:7,col:5}]
        }, {
            name: 'two positions, rows are equal, cols not sorted',
            input: [{row:2,col:5},{row:2,col:3}], expected: [{row:2,col:3},{row:2,col:5}]
        }, {
            name: 'two positions, rows are equal, cols sorted',
            input: [{row:2,col:3},{row:2,col:5}], expected: [{row:2,col:3},{row:2,col:5}]
        }].forEach(({name, input, expected}) => {
            it(name, () => {
                input.sort(sortPositions);
                assert.deepStrictEqual(input, expected);
            });
        });
    });
});