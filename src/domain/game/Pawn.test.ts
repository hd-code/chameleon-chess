import assert from "assert/strict";
import { Pawn, PawnWithPosition } from "./Pawn";
import { Position } from "./Position";
import { mockFieldColorGetter } from "./mocks";
import { Color, Player } from "./types";

describe(Pawn.name, () => {
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
                const pawn = new Pawn(player, knightColor as Color);
                assert.deepStrictEqual(pawn.roles, want);
            });
        });
    });
});

describe(PawnWithPosition.name, () => {
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
                const pawn = new PawnWithPosition(
                    new Pawn(player, knightColor as Color),
                    new Position(0, 0),
                    mockFieldColorGetter(fieldColor as Color),
                );
                assert.strictEqual(pawn.role, want);
            });
        });
    });
});
