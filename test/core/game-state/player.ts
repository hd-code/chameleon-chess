import { FieldColor, Pawn, Player } from 'core/game-state';
import { arePlayersAlive, getNextPlayer, isPlayer } from 'core/game-state/player';

// -----------------------------------------------------------------------------

const redPawns: Pawn[] = [
    { player: Player.red, knightColor: FieldColor.red, position: { row: 0, col: 0 } },
    { player: Player.red, knightColor: FieldColor.green, position: { row: 0, col: 1 } },
];
const greenPawns: Pawn[] = [{ player: Player.green, knightColor: FieldColor.blue, position: { row: 3, col: 5 } }];
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
            ['all pawns, now red, then blue', allPawn, Player.red, Player.blue],
            ['all pawns, now green, then red', allPawn, Player.green, Player.red],
            ['all pawns, now yellow, then green', allPawn, Player.yellow, Player.green],
            ['all pawns, now blue, then yellow', allPawn, Player.blue, Player.yellow],
            ['red and yellow pawns, now red, then yellow', redYellowPawns, Player.red, Player.yellow],
            ['red and yellow pawns, now yellow, then red', redYellowPawns, Player.yellow, Player.red],
            ['red and yellow pawns, now green, then red', redYellowPawns, Player.green, Player.red],
            ['red and yellow pawns, now blue, then yellow', redYellowPawns, Player.blue, Player.yellow],
            ['green and blue pawns, now blue, then green', greenBluePawns, Player.blue, Player.green],
            ['green and blue pawns, now red, then blue', greenBluePawns, Player.red, Player.blue],
        ])('%s', (_, pawns, current, expected) => {
            expect(getNextPlayer(current, pawns)).toBe(expected);
        }),
    );
});
