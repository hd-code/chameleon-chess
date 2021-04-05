import { Color, Pawn } from 'core/game/game-state';
import { arePlayersAlive, getNextPlayer, isPlayer } from 'core/game/game-state/player';

// -----------------------------------------------------------------------------

const redPawns: Pawn[] = [
    { player: Color.red, knightColor: Color.red, position: { row: 0, col: 0 } },
    { player: Color.red, knightColor: Color.green, position: { row: 0, col: 1 } },
];
const greenPawns: Pawn[] = [{ player: Color.green, knightColor: Color.blue, position: { row: 3, col: 5 } }];
const yellowPawns: Pawn[] = [
    { player: Color.yellow, knightColor: Color.red, position: { row: 0, col: 6 } },
    { player: Color.yellow, knightColor: Color.green, position: { row: 1, col: 6 } },
    { player: Color.yellow, knightColor: Color.yellow, position: { row: 2, col: 6 } },
    { player: Color.yellow, knightColor: Color.blue, position: { row: 3, col: 6 } },
];
const bluePawns: Pawn[] = [
    { player: Color.blue, knightColor: Color.yellow, position: { row: 4, col: 4 } },
    { player: Color.blue, knightColor: Color.blue, position: { row: 3, col: 4 } },
];
const redYellowPawns = [...redPawns, ...yellowPawns];
const greenBluePawns = [...greenPawns, ...bluePawns];
const allPawn = [...redPawns, ...greenPawns, ...yellowPawns, ...bluePawns];

describe('core/game-state/player', () => {
    describe(isPlayer.name, () =>
        it.each([
            [0, true],
            [1, true],
            [2, true],
            [3, true],
            [-1, false],
            [4, false],
            [0.5, false],
            [2.3, false],
            ['0', false],
            [null, false],
            [[], false],
            [{}, false],
        ])('%p => %p', (input, expected) => {
            expect(isPlayer(input)).toBe(expected);
        }),
    );

    describe(arePlayersAlive.name, () =>
        it.each([
            ['only red pawns', redPawns, { 0: true, 1: false, 2: false, 3: false }],
            ['only yellow pawns', yellowPawns, { 0: false, 1: false, 2: true, 3: false }],
            ['only blue pawns', bluePawns, { 0: false, 1: false, 2: false, 3: true }],
            ['red and green pawns', [...redPawns, ...greenPawns], { 0: true, 1: true, 2: false, 3: false }],
            ['red and yellow pawns', redYellowPawns, { 0: true, 1: false, 2: true, 3: false }],
            ['green and blue pawns', greenBluePawns, { 0: false, 1: true, 2: false, 3: true }],
            ['pawns of all', allPawn, { 0: true, 1: true, 2: true, 3: true }],
            ['no pawns', [], { 0: false, 1: false, 2: false, 3: false }],
        ])('%s', (_, pawns, expected) => {
            expect(arePlayersAlive(pawns)).toEqual(expected);
        }),
    );

    describe(getNextPlayer.name, () =>
        it.each([
            ['all pawns, now red, then blue', allPawn, Color.red, Color.blue],
            ['all pawns, now green, then red', allPawn, Color.green, Color.red],
            ['all pawns, now yellow, then green', allPawn, Color.yellow, Color.green],
            ['all pawns, now blue, then yellow', allPawn, Color.blue, Color.yellow],
            ['red and yellow pawns, now red, then yellow', redYellowPawns, Color.red, Color.yellow],
            ['red and yellow pawns, now yellow, then red', redYellowPawns, Color.yellow, Color.red],
            ['red and yellow pawns, now green, then red', redYellowPawns, Color.green, Color.red],
            ['red and yellow pawns, now blue, then yellow', redYellowPawns, Color.blue, Color.yellow],
            ['green and blue pawns, now blue, then green', greenBluePawns, Color.blue, Color.green],
            ['green and blue pawns, now red, then blue', greenBluePawns, Color.red, Color.blue],
        ])('%s', (_, pawns, current, expected) => {
            expect(getNextPlayer(current, pawns)).toBe(expected);
        }),
    );
});
