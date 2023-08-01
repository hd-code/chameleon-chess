import * as assert from "assert/strict";
import { Color } from "./Color";
import { Limits } from "./Limits";
import { Pawn, Role, Roles } from "./Pawn";
import { Position } from "./Position";

describe(Pawn.name, function () {
    describe(Pawn.getInitial.name, function () {
        [0, 1, 2, 3].forEach((player) => {
            it(`get ${Color[player]} pawn`, function () {
                const got = Pawn.getInitial(player);
                assert.equal(got.length, 4);
                got.forEach((pawn) => assert.equal(pawn.player, player));
            });
        });
    });

    describe("properties", function () {
        // prettier-ignore
        const testCases: [Color, Color, Position, string, Roles, Role][] = [
            [Color.red, Color.red, new Position(0, 0), "rr", [0, 1, 2, 3], 3],
            [Color.red, Color.red, new Position(5, 3), "rr", [0, 1, 2, 3], 2],
            [
                Color.green,
                Color.yellow,
                new Position(1, 6),
                "gy",
                [2, 3, 0, 1],
                2,
            ],
        ];
        testCases.forEach(([player, knightColor, pos, id, roles, role]) => {
            describe(`Pawn(${Color[player]}, ${Color[knightColor]}, ${pos})`, function () {
                const pawn = new Pawn(player, knightColor, pos);
                it("id", () => assert.equal(pawn.id, id));
                it("role", () => assert.equal(pawn.role, role));
                it("roles", () => assert.deepEqual(pawn.roles, roles));
            });
        });
    });

    it(Pawn.prototype.setPosition.name, function () {
        const positionBefore = new Position(2, 4);
        const pawn = new Pawn(Color.red, Color.green, positionBefore);
        const position = new Position(5, 5);
        const got = pawn.setPosition(position);
        assert.equal(got.player, pawn.player);
        assert.equal(got.knightColor, pawn.knightColor);
        assert.equal(got.position, position);
        assert.equal(pawn.position, positionBefore);
    });

    describe(Pawn.prototype.getMoves.name, function () {
        const pawns = [
            new Pawn(Color.red, Color.yellow, new Position(5, 3)), // red knight
            new Pawn(Color.red, Color.green, new Position(4, 1)), // red rook
            new Pawn(Color.red, Color.red, new Position(2, 1)), // red blocking pawn
            new Pawn(Color.yellow, Color.blue, new Position(2, 3)), // yellow bishop
            new Pawn(Color.yellow, Color.yellow, new Position(4, 5)), // yellow queen
            new Pawn(Color.yellow, Color.green, new Position(1, 0)), // yellow corner pawn
            new Pawn(Color.yellow, Color.red, new Position(1, 6)), // yellow corner pawn
        ];
        const limits = new Limits(new Position(1, 0), new Position(5, 6));

        const test = (index: number, want: Position[]) => () => {
            const got = pawns[index].getMoves(pawns, limits);
            want.sort(Position.sort);
            got.sort(Position.sort);
            assert.deepEqual(got, want);
        };

        it(
            "knight moves",
            test(0, [
                new Position(3, 4),
                new Position(4, 5), // opponent's pawn
                // new Position(6, 5), // outside of limits
                // new Position(7, 4), // outside of limits
                // new Position(7, 2), // outside of limits
                // new Position(6, 1), // outside of limits
                // new Position(4, 1), // own pawn
                new Position(3, 2),
            ]),
        );
        it(
            "rook moves",
            test(1, [
                // upwards -----------------------------------------------------
                // new Position(0, 1), // outside of limits
                // new Position(1, 1), // blocked by own pawn
                // new Position(2, 1), // own pawn
                new Position(3, 1),
                // downwards ---------------------------------------------------
                new Position(5, 1),
                // new Position(6, 1), // outside of limits
                // leftwards ---------------------------------------------------
                new Position(4, 0),
                // rightwards --------------------------------------------------
                new Position(4, 2),
                new Position(4, 3),
                new Position(4, 4),
                new Position(4, 5), // opponent's pawn
                // new Position(4, 6), // opponent's pawn is blocking the way'
                // new Position(4, 7), // outside of limits
            ]),
        );
        it(
            "bishop moves",
            test(3, [
                // right and upwards -------------------------------------------
                new Position(1, 4),
                // new Position(0, 5), // outside of limits
                // right and downwards -----------------------------------------
                new Position(3, 4),
                // new Position(4, 5), // own pawn
                // new Position(5, 6), // own pawn is blocking the way
                // new Position(6, 7), // outside of limits
                // left and downwards ------------------------------------------
                new Position(3, 2),
                new Position(4, 1), // opponent's pawn'
                // new Position(5, 0), // opponent's pawn is blocking the way'
                // left and upwards --------------------------------------------
                new Position(1, 2),
                // new Position(0, 1), // outside of limits
            ]),
        );
        it(
            "queen moves",
            test(4, [
                // right and upwards -------------------------------------------
                new Position(3, 6),
                // right -----------------------------------------------------------
                new Position(4, 6),
                // right and downwards ---------------------------------------------
                new Position(5, 6),
                // downwards -------------------------------------------------------
                new Position(5, 5),
                // left and downwards ----------------------------------------------
                new Position(5, 4),
                // left ------------------------------------------------------------
                new Position(4, 4),
                new Position(4, 3),
                new Position(4, 2),
                new Position(4, 1),
                // left and upwards ------------------------------------------------
                new Position(3, 4),
                // upwards ---------------------------------------------------------
                new Position(3, 5),
                new Position(2, 5),
                new Position(1, 5),
            ]),
        );
    });
});
