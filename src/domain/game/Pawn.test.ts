import assert from "assert/strict";
import { Color } from "./Color";
import { Pawn } from "./Pawn";
import { Player } from "./Player";
import { Position } from "./Position";
import { mockFieldColorGetter } from "./helper";

describe(Pawn.name, () => {
    const position = new Position(0, 0);

    describe("id", () => {
        [
            { playerColor: "red", knightColor: "red", want: "rr" },
            { playerColor: "green", knightColor: "red", want: "gr" },
            { playerColor: "red", knightColor: "yellow", want: "ry" },
            { playerColor: "blue", knightColor: "yellow", want: "by" },
        ].forEach(({ playerColor, knightColor, want }) => {
            it(`${playerColor} + ${knightColor} => ${want}`, () => {
                const player = { color: playerColor } as Player;
                const pawn = new Pawn(
                    player,
                    knightColor as Color,
                    position,
                    mockFieldColorGetter(knightColor as Color),
                );
                assert.strictEqual(pawn.id, want);
            });
        });
    });

    describe("roles", () => {
        [
            {
                knightColor: "red",
                want: {
                    red: "knight",
                    green: "queen",
                    yellow: "bishop",
                    blue: "rook",
                },
            },
            {
                knightColor: "green",
                want: {
                    red: "rook",
                    green: "knight",
                    yellow: "queen",
                    blue: "bishop",
                },
            },
            {
                knightColor: "yellow",
                want: {
                    red: "bishop",
                    green: "rook",
                    yellow: "knight",
                    blue: "queen",
                },
            },
            {
                knightColor: "blue",
                want: {
                    red: "queen",
                    green: "bishop",
                    yellow: "rook",
                    blue: "knight",
                },
            },
        ].forEach(({ knightColor, want }) => {
            it(`${knightColor} => ${JSON.stringify(want)}`, () => {
                const player = { color: knightColor } as Player;
                const pawn = new Pawn(
                    player,
                    knightColor as Color,
                    position,
                    mockFieldColorGetter(knightColor as Color),
                );
                assert.deepStrictEqual(pawn.roles, want);
            });
        });
    });

    describe("role", () => {
        [
            { knightColor: "red", fieldColor: "red", want: "knight" },
            { knightColor: "red", fieldColor: "green", want: "queen" },
            { knightColor: "red", fieldColor: "yellow", want: "bishop" },
            { knightColor: "red", fieldColor: "blue", want: "rook" },
            { knightColor: "green", fieldColor: "red", want: "rook" },
        ].forEach(({ knightColor, fieldColor, want }) => {
            it(`knight:${knightColor}, field:${fieldColor} => ${want}`, () => {
                const player = { color: knightColor } as Player;
                const pawn = new Pawn(
                    player,
                    knightColor as Color,
                    position,
                    mockFieldColorGetter(fieldColor as Color),
                );
                assert.strictEqual(pawn.role, want);
            });
        });
    });
});
