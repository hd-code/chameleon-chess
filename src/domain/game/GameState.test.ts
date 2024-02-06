import assert from "assert/strict";
import { GameState } from "./GameState";
import { testMoves } from "./tests";

describe(GameState.name, () => {
    describe(GameState.prototype.update.name, () => {
        it("TODO: invalid moves...");

        testMoves.forEach(
            ({ name, activePlayer, board, move, want, wantPlayer }) => {
                it(name, () => {
                    const gameState = new GameState(activePlayer, board);
                    const got = gameState.update(move);
                    assert.deepEqual(got.activePlayer, wantPlayer);
                    assert.deepEqual(got.board, want);
                });
            },
        );
    });
});
