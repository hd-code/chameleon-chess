import { arePlayersAlive, getNextPlayer, isPlayer } from 'models/game-state/player';
import * as assert from 'assert';

import { FieldColor, Pawn, Player } from 'models/game-state';

// -----------------------------------------------------------------------------

const redPawns: Pawn[] = [
    { player: Player.red, knightColor: FieldColor.red, position: { row: 0, col: 0 } },
    { player: Player.red, knightColor: FieldColor.green, position: { row: 0, col: 1 } },
];
const greenPawns: Pawn[] = [
    { player: Player.green, knightColor: FieldColor.blue, position: { row: 3, col: 5 } },
];
const yellowPawns: Pawn[] = [
    { player: Player.yellow, knightColor: FieldColor.red, position: { row: 0, col: 6 } },
    { player: Player.yellow, knightColor: FieldColor.green, position: { row: 1, col: 6 } },
    { player: Player.yellow, knightColor: FieldColor.yellow, position: { row: 2, col: 6 } },
    { player: Player.yellow, knightColor: FieldColor.blue, position: { row: 3, col: 6 } },
];
const bluePawns: Pawn[] = [
    { player: Player.blue, knightColor: FieldColor.yellow, position: { row: 4, col: 4 } },
    { player: Player.blue, knightColor: FieldColor.blue, position: { row: 3, col: 4 } },
];
const redYellowPawns = [ ...redPawns, ...yellowPawns ];
const greenBluePawns = [ ...greenPawns, ...bluePawns ];
const allPawns = [ ...redPawns, ...greenPawns, ...yellowPawns, ...bluePawns ];

describe('models/game-state/player', () => {
    describe(isPlayer.name, () => {
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
                const actual = isPlayer(input);
                assert.strictEqual(actual, expected);
            });
        });
    });

    describe(arePlayersAlive.name, () => {
        [{
            name: 'only red pawns', pawns: redPawns,
            expected: { 0: true, 1: false, 2: false, 3: false }
        }, {
            name: 'only yellow pawns', pawns: yellowPawns,
            expected: { 0: false, 1: false, 2: true, 3: false }
        }, {
            name: 'only blue pawns', pawns: bluePawns,
            expected: { 0: false, 1: false, 2: false, 3: true }
        }, {
            name: 'red and green pawns', pawns: [...redPawns, ...greenPawns],
            expected: { 0: true, 1: true, 2: false, 3: false }
        }, {
            name: 'red and yellow pawns', pawns: redYellowPawns,
            expected: { 0: true, 1: false, 2: true, 3: false }
        }, {
            name: 'green and blue pawns', pawns: greenBluePawns,
            expected: { 0: false, 1: true, 2: false, 3: true }
        }, {
            name: 'pawns of all', pawns: allPawns,
            expected: { 0: true, 1: true, 2: true, 3: true }
        }, {
            name: 'no pawns', pawns: [],
            expected: { 0: false, 1: false, 2: false, 3: false }
        }].forEach(({ name, pawns, expected }) => {
            it(name, () => {
                const actual = arePlayersAlive(pawns);
                assert.deepStrictEqual(actual, expected);
            });
        });
    });

    describe(getNextPlayer.name, () => {
        [{
            name: 'all pawns, now red, then blue', pawns: allPawns,
            current: Player.red, expected: Player.blue
        }, {
            name: 'all pawns, now green, then red', pawns: allPawns,
            current: Player.green, expected: Player.red
        }, {
            name: 'all pawns, now yellow, then green', pawns: allPawns,
            current: Player.yellow, expected: Player.green
        }, {
            name: 'all pawns, now blue, then yellow', pawns: allPawns,
            current: Player.blue, expected: Player.yellow
        }, {
            name: 'red and yellow pawns, now red, then yellow', pawns: redYellowPawns,
            current: Player.red, expected: Player.yellow
        }, {
            name: 'red and yellow pawns, now yellow, then red', pawns: redYellowPawns,
            current: Player.yellow, expected: Player.red
        }, {
            name: 'red and yellow pawns, now green, then red', pawns: redYellowPawns,
            current: Player.green, expected: Player.red
        }, {
            name: 'red and yellow pawns, now blue, then yellow', pawns: redYellowPawns,
            current: Player.blue, expected: Player.yellow
        }, {
            name: 'green and blue pawns, now blue, then green', pawns: greenBluePawns,
            current: Player.blue, expected: Player.green
        }, {
            name: 'green and blue pawns, now red, then blue', pawns: greenBluePawns,
            current: Player.red, expected: Player.blue
        }].forEach(({ name, pawns, current, expected }) => {
            it(name, () => {
                const actual = getNextPlayer(current, pawns);
                assert.strictEqual(actual, expected);
            });
        });
    });
});