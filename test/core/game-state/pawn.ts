import { FieldColor, GameState, Player, Position, getStartGameState } from 'core/game-state';
import { isSamePosition, sortPositions } from 'core/game-state/board';
import {
    Role,
    getMoves,
    getPawnIndexAtPosition,
    getRole,
    getRoleMapping,
    getStartPawns,
    isPawn,
    isRole,
} from 'core/game-state/pawn';

// -----------------------------------------------------------------------------

const gs = <GameState>{
    limits: { minRow: 1, maxRow: 5, minCol: 0, maxCol: 6 },
    pawns: [
        { player: Player.red, position: { row: 5, col: 3 }, knightColor: FieldColor.yellow }, // red knight
        { player: Player.red, position: { row: 4, col: 1 }, knightColor: FieldColor.green }, // red rook
        { player: Player.red, position: { row: 2, col: 1 }, knightColor: FieldColor.red }, // red blocking pawn
        { player: Player.yellow, position: { row: 2, col: 3 }, knightColor: FieldColor.blue }, // yellow bishop
        { player: Player.yellow, position: { row: 4, col: 5 }, knightColor: FieldColor.yellow }, // yellow queen
        { player: Player.yellow, position: { row: 1, col: 0 }, knightColor: FieldColor.green }, // yellow corner pawn
        { player: Player.yellow, position: { row: 1, col: 6 }, knightColor: FieldColor.red }, // yellow corner pawn
    ],
    player: Player.red,
};

const knightIndex = 0;
const knightMoves = <Position[]>[
    // starting on upmost right move, then going clockwise ---------------------
    { row: 3, col: 4 },
    { row: 4, col: 5 }, // opponent's pawn
    // { row: 6, col: 5 }, // outside of limits
    // { row: 7, col: 4 }, // outside of limits
    // { row: 7, col: 2 }, // outside of limits
    // { row: 6, col: 1 }, // outside of limits
    // { row: 4, col: 1 }, // own pawn
    { row: 3, col: 2 },
];

const rookIndex = 1;
const rookMoves = <Position[]>[
    // to the right ------------------------------------------------------------
    { row: 4, col: 2 },
    { row: 4, col: 3 },
    { row: 4, col: 4 },
    { row: 4, col: 5 }, // opponent's pawn
    // { row: 4, col: 6 }, // opponent's pawn is blocking the way'
    // { row: 4, col: 7 }, // outside of limits

    // downwards ---------------------------------------------------------------
    { row: 5, col: 1 },
    // { row: 6, col: 1 }, // outside of limits

    // to the left -------------------------------------------------------------
    { row: 4, col: 0 },

    // upwards -----------------------------------------------------------------
    { row: 3, col: 1 },
    // { row: 2, col: 1 }, // own pawn
    // { row: 1, col: 1 }, // own pawn is blocking the way
    // { row: 0, col: 1 }, // outside of limits
];

const bishopIndex = 3;
const bishopMoves = <Position[]>[
    // right and upwards -------------------------------------------------------
    { row: 1, col: 4 },
    // { row: 0, col: 5 }, // outside of limits

    // right and downwards -----------------------------------------------------
    { row: 3, col: 4 },
    // { row: 4, col: 5 }, // own pawn
    // { row: 5, col: 6 }, // own pawn is blocking the way
    // { row: 6, col: 7 }, // outside of limits

    // left and downwards ------------------------------------------------------
    { row: 3, col: 2 },
    { row: 4, col: 1 }, // opponent's pawn'
    // { row: 5, col: 0 }, // opponent's pawn is blocking the way'

    // left and upwards --------------------------------------------------------
    { row: 1, col: 2 },
    // { row: 0, col: 1 }, // outside of limits
];

const queenIndex = 4;
const queenMoves = <Position[]>[
    // right and upwards -------------------------------------------------------
    { row: 3, col: 6 },
    // { row: 2, col: 7 }, // outside of limits

    // right -------------------------------------------------------------------
    { row: 4, col: 6 },
    // { row: 4, col: 7 }, // outside of limits

    // right and downwards -----------------------------------------------------
    { row: 5, col: 6 },
    // { row: 6, col: 7 }, // outside of limits

    // downwards ---------------------------------------------------------------
    { row: 5, col: 5 },
    // { row: 6, col: 5 }, // outside of limits

    // left and downwards ------------------------------------------------------
    { row: 5, col: 4 },
    // { row: 6, col: 3 }, // outside of limits

    // left --------------------------------------------------------------------
    { row: 4, col: 4 },
    { row: 4, col: 3 },
    { row: 4, col: 2 },
    { row: 4, col: 1 }, // opponent's pawn'
    // { row: 4, col: 0 }, // opponent's pawn is blocking the way

    // left and upwards --------------------------------------------------------
    { row: 3, col: 4 },
    // { row: 2, col: 3 }, // own pawn
    // { row: 1, col: 2 }, // own pawn is blocking the way
    // { row: 0, col: 1 }, // outside of limits

    // upwards -----------------------------------------------------------------
    { row: 3, col: 5 },
    { row: 2, col: 5 },
    { row: 1, col: 5 },
    // { row: 0, col: 5 }, // outside of limits
];

describe('core/game-state/pawn', () => {
    describe(isRole.name, () => {
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
        ])('%j => %j', (input, expected) => {
            const actual = isRole(input);
            expect(actual).toBe(expected);
        });
    });

    describe(isPawn.name, () => {
        it.each([
            [{ player: 0, position: { row: 5, col: 3 }, knightColor: 0 }, true],
            [{ player: 3, position: { row: 5, col: 1 }, knightColor: 0 }, true],
            [{ player: 0, position: { row: 1, col: 3 }, knightColor: 3 }, true],
            [{ player: 1, position: { row: 5, col: 4 }, knightColor: 0 }, true],
            [{ player: 2, position: { row: 2, col: 3 }, knightColor: 2 }, true],
            [{ player: 2, position: { row: 3, col: 7 }, knightColor: 0 }, true],
            [{ player: 2, position: { row: 3, col: 7 }, knightColor: 8 }, false],
            [{ player: 6, position: { row: 3, col: 7 }, knightColor: 0 }, false],
            [{ player: 2, position: { row: 0.5, col: 7 }, knightColor: 0 }, false],
            [{ player: 2, position: { row: 3, col: -2 }, knightColor: 0 }, false],
            [{ position: { row: 3, col: 7 }, knightColor: 0 }, false],
            [{ player: 2, knightColor: 0 }, false],
            [{ player: 2, position: { row: 3, col: 7 } }, false],
            [{ player: 2, position: { row: 3 }, knightColor: 0 }, false],
            [{ player: 2, position: { col: 7 }, knightColor: 0 }, false],
            [{ col: 3 }, false],
            [4, false],
            [-1, false],
            [0.5, false],
            [2.3, false],
            ['0', false],
            [null, false],
            [[], false],
            [{}, false],
        ])('%j => %j', (input, expected) => {
            const actual = isPawn(input);
            expect(actual).toBe(expected);
        });
    });

    describe(getMoves.name, () => {
        it.each([
            ['should return the correct moves for a knight', knightIndex, knightMoves],
            ['should return the correct moves for a queen', queenIndex, queenMoves],
            ['should return the correct moves for a bishop', bishopIndex, bishopMoves],
            ['should return the correct moves for a rook', rookIndex, rookMoves],
        ])('%s', (_, pawnI, expected) => {
            const actual = getMoves(pawnI, gs.pawns, gs.limits);
            actual.sort(sortPositions);
            expected.sort(sortPositions);
            expect(actual).toEqual(expected);
        });

        it('should return 13 moves for all pawns of a player in start game state', () => {
            const gs = getStartGameState(true, true, true, true) as GameState;

            const movesRed = [];
            movesRed.push(...getMoves(0, gs.pawns, gs.limits));
            movesRed.push(...getMoves(1, gs.pawns, gs.limits));
            movesRed.push(...getMoves(2, gs.pawns, gs.limits));
            movesRed.push(...getMoves(3, gs.pawns, gs.limits));

            expect(movesRed.length).toBe(13);
        });
    });

    describe(getPawnIndexAtPosition.name, () => {
        const pawns = [
            { player: Player.red, position: { row: 5, col: 3 }, knightColor: FieldColor.yellow },
            { player: Player.red, position: { row: 4, col: 1 }, knightColor: FieldColor.green },
            { player: Player.red, position: { row: 2, col: 1 }, knightColor: FieldColor.red },
            { player: Player.yellow, position: { row: 2, col: 3 }, knightColor: FieldColor.blue },
            { player: Player.yellow, position: { row: 4, col: 5 }, knightColor: FieldColor.yellow },
            { player: Player.yellow, position: { row: 1, col: 0 }, knightColor: FieldColor.green },
            { player: Player.yellow, position: { row: 1, col: 6 }, knightColor: FieldColor.red },
        ];

        [
            { position: { row: 5, col: 3 }, expected: 0 },
            { position: { row: 4, col: 1 }, expected: 1 },
            { position: { row: 2, col: 3 }, expected: 3 },
            { position: { row: 4, col: 5 }, expected: 4 },
            { position: { row: 1, col: 6 }, expected: 6 },
            { position: { row: 0, col: 0 }, expected: -1 },
            { position: { row: 0, col: 1 }, expected: -1 },
            { position: { row: 0, col: 2 }, expected: -1 },
            { position: { row: 7, col: 5 }, expected: -1 },
        ].forEach(({ position, expected }) => {
            const nthPawn = expected === -1 ? 'no' : `the ${expected}.`;
            it(`At ${JSON.stringify(position)} there is ${nthPawn} pawn`, () => {
                const actual = getPawnIndexAtPosition(position, pawns);
                expect(actual).toBe(expected);
            });
        });
    });

    describe(getRole.name, () => {
        [
            {
                pawn: { player: 0, position: { row: 5, col: 3 }, knightColor: FieldColor.yellow },
                expected: Role.knight,
            },
            { pawn: { player: 1, position: { row: 4, col: 1 }, knightColor: FieldColor.green }, expected: Role.rook },
            { pawn: { player: 2, position: { row: 2, col: 3 }, knightColor: FieldColor.blue }, expected: Role.bishop },
            { pawn: { player: 3, position: { row: 4, col: 5 }, knightColor: FieldColor.yellow }, expected: Role.queen },
            { pawn: { player: 3, position: { row: 4, col: 5 }, knightColor: FieldColor.red }, expected: Role.rook },
        ].forEach(({ pawn, expected }) => {
            const posString = JSON.stringify(pawn.position);
            it(`pawn at ${posString} with knight color ${FieldColor[pawn.knightColor]} => ${Role[expected]}`, () => {
                const actual = getRole(pawn);
                expect(actual).toBe(expected);
            });
        });
    });

    describe(getRoleMapping.name, () => {
        const basePawn = { player: 0, position: { row: 0, col: 0 }, knightColor: 0 };

        it.each([
            [FieldColor.red, { 0: 0, 1: 1, 2: 2, 3: 3 }],
            [FieldColor.green, { 0: 3, 1: 0, 2: 1, 3: 2 }],
            [FieldColor.yellow, { 0: 2, 1: 3, 2: 0, 3: 1 }],
            [FieldColor.blue, { 0: 1, 1: 2, 2: 3, 3: 0 }],
        ])('%j => %j', (knightColor, expected) => {
            const pawn = { ...basePawn, knightColor };
            const actual = getRoleMapping(pawn);
            expect(actual).toEqual(expected);
        });
    });

    describe(getStartPawns.name, () => {
        describe.each([Player.red, Player.green, Player.yellow, Player.blue])('Player: %j', player => {
            const pawns = getStartPawns(player);

            it('There should be 4 pawns', () => expect(pawns.length).toBe(4));

            it('All pawns should be from the same player', () =>
                pawns.forEach(pawn => expect(pawn.player).toEqual(player)));

            it('Pawns should have different knight colors', () => {
                const knightColors = pawns.map(pawn => pawn.knightColor);
                expect(knightColors[0]).not.toBe(knightColors[1]);
                expect(knightColors[0]).not.toBe(knightColors[2]);
                expect(knightColors[0]).not.toBe(knightColors[3]);
                expect(knightColors[1]).not.toBe(knightColors[2]);
                expect(knightColors[1]).not.toBe(knightColors[3]);
                expect(knightColors[2]).not.toBe(knightColors[3]);
            });

            it('No pawns should be at the same position', () => {
                const positions = pawns.map(pawn => pawn.position);
                positions.sort(sortPositions);
                expect(isSamePosition(positions[0], positions[1])).toBeFalsy();
                expect(isSamePosition(positions[1], positions[2])).toBeFalsy();
                expect(isSamePosition(positions[2], positions[3])).toBeFalsy();
            });
        });
    });
});
