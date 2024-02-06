import { Board } from "./Board";
import { Bounds } from "./Bounds";
import { Pawn } from "./Pawn";
import { Position } from "./Position";
import { bluePlayer, greenPlayer, redPlayer, yellowPlayer } from "./mocks";
import { Move } from "./types";

export const testMoves = [
    {
        name: "normal move",
        activePlayer: bluePlayer,
        board: new Board(new Bounds(3, 2, 6, 6), [
            [new Pawn(greenPlayer, "yellow"), new Position(3, 6)],
            [new Pawn(bluePlayer, "green"), new Position(6, 2)],
            [new Pawn(bluePlayer, "blue"), new Position(4, 3)], // moves
        ]),
        move: new Move(new Position(4, 3), new Position(5, 4)),
        want: new Board(new Bounds(3, 2, 6, 6), [
            [new Pawn(greenPlayer, "yellow"), new Position(3, 6)],
            [new Pawn(bluePlayer, "green"), new Position(6, 2)],
            [new Pawn(bluePlayer, "blue"), new Position(5, 4)], // moved
        ]),
        wantPlayer: greenPlayer,
    },
    {
        name: "move causes shrinking",
        activePlayer: bluePlayer,
        board: new Board(new Bounds(1, 1, 7, 6), [
            [new Pawn(greenPlayer, "red"), new Position(1, 5)],
            [new Pawn(greenPlayer, "green"), new Position(2, 2)],
            [new Pawn(yellowPlayer, "yellow"), new Position(7, 4)],
            [new Pawn(yellowPlayer, "red"), new Position(6, 6)],
            [new Pawn(bluePlayer, "green"), new Position(3, 4)],
            [new Pawn(bluePlayer, "yellow"), new Position(6, 1)], // moves
        ]),
        move: new Move(new Position(6, 1), new Position(4, 3)),
        want: new Board(new Bounds(1, 2, 7, 6), [
            [new Pawn(greenPlayer, "red"), new Position(1, 5)],
            [new Pawn(greenPlayer, "green"), new Position(2, 2)],
            [new Pawn(yellowPlayer, "yellow"), new Position(7, 4)],
            [new Pawn(yellowPlayer, "red"), new Position(6, 6)],
            [new Pawn(bluePlayer, "green"), new Position(3, 4)],
            [new Pawn(bluePlayer, "yellow"), new Position(4, 3)], // moved
        ]),
        wantPlayer: yellowPlayer,
    },
    {
        name: "beating move, no shrinking",
        activePlayer: redPlayer,
        board: new Board(new Bounds(1, 1, 7, 6), [
            [new Pawn(redPlayer, "red"), new Position(3, 4)], // moves
            [new Pawn(greenPlayer, "red"), new Position(1, 5)],
            [new Pawn(greenPlayer, "green"), new Position(2, 2)],
            [new Pawn(yellowPlayer, "yellow"), new Position(7, 4)], // is beaten
            [new Pawn(yellowPlayer, "red"), new Position(6, 6)],
            [new Pawn(bluePlayer, "yellow"), new Position(6, 1)],
        ]),
        move: new Move(new Position(3, 4), new Position(7, 4)),
        want: new Board(new Bounds(1, 1, 7, 6), [
            [new Pawn(redPlayer, "red"), new Position(7, 4)], // moved
            [new Pawn(greenPlayer, "red"), new Position(1, 5)],
            [new Pawn(greenPlayer, "green"), new Position(2, 2)],
            [new Pawn(yellowPlayer, "red"), new Position(6, 6)],
            [new Pawn(bluePlayer, "yellow"), new Position(6, 1)],
        ]),
        wantPlayer: bluePlayer,
    },
    {
        name: "beating move with shrinking",
        activePlayer: bluePlayer,
        board: new Board(new Bounds(1, 1, 7, 6), [
            [new Pawn(redPlayer, "red"), new Position(3, 4)],
            [new Pawn(greenPlayer, "red"), new Position(1, 5)],
            [new Pawn(greenPlayer, "green"), new Position(2, 2)],
            [new Pawn(yellowPlayer, "yellow"), new Position(7, 4)],
            [new Pawn(yellowPlayer, "red"), new Position(6, 6)], // is beaten
            [new Pawn(bluePlayer, "green"), new Position(6, 1)], // moves
        ]),
        move: new Move(new Position(6, 1), new Position(6, 6)),
        want: new Board(new Bounds(1, 2, 7, 6), [
            [new Pawn(redPlayer, "red"), new Position(3, 4)],
            [new Pawn(greenPlayer, "red"), new Position(1, 5)],
            [new Pawn(greenPlayer, "green"), new Position(2, 2)],
            [new Pawn(yellowPlayer, "yellow"), new Position(7, 4)],
            [new Pawn(bluePlayer, "green"), new Position(6, 6)], // moved
        ]),
        wantPlayer: yellowPlayer,
    },
    {
        name: "move causes shrinking to smallest bounds",
        activePlayer: bluePlayer,
        board: new Board(new Bounds(1, 3, 4, 6), [
            [new Pawn(greenPlayer, "yellow"), new Position(3, 5)],
            [new Pawn(yellowPlayer, "yellow"), new Position(4, 3)],
            [new Pawn(bluePlayer, "red"), new Position(1, 6)], // moves
        ]),
        move: new Move(new Position(1, 6), new Position(3, 4)),
        want: new Board(new Bounds(2, 3, 4, 5), [
            [new Pawn(greenPlayer, "yellow"), new Position(3, 5)],
            [new Pawn(yellowPlayer, "yellow"), new Position(4, 3)],
            [new Pawn(bluePlayer, "red"), new Position(3, 4)], // moved
        ]),
        wantPlayer: yellowPlayer,
    },
    {
        name: "beating move causes shrinking to smallest bounds",
        activePlayer: yellowPlayer,
        board: new Board(new Bounds(2, 3, 7, 5), [
            [new Pawn(redPlayer, "green"), new Position(3, 4)],
            [new Pawn(yellowPlayer, "red"), new Position(7, 5)], // moves
            [new Pawn(bluePlayer, "red"), new Position(3, 5)], // is beaten
        ]),
        move: new Move(new Position(7, 5), new Position(3, 5)),
        want: new Board(new Bounds(2, 3, 4, 5), [
            [new Pawn(redPlayer, "green"), new Position(3, 4)],
            [new Pawn(yellowPlayer, "red"), new Position(3, 5)], // moved
        ]),
        wantPlayer: redPlayer,
    },
    {
        name: "normal move on smallest board",
        activePlayer: yellowPlayer,
        board: new Board(new Bounds(1, 5, 3, 7), [
            [new Pawn(redPlayer, "red"), new Position(2, 5)],
            [new Pawn(yellowPlayer, "yellow"), new Position(1, 6)], // moves
        ]),
        move: new Move(new Position(1, 6), new Position(3, 7)),
        want: new Board(new Bounds(1, 5, 3, 7), [
            [new Pawn(redPlayer, "red"), new Position(2, 5)],
            [new Pawn(yellowPlayer, "yellow"), new Position(3, 7)], // moved
        ]),
        wantPlayer: redPlayer,
    },
    {
        name: "beating move on smallest board and winning",
        activePlayer: redPlayer,
        board: new Board(new Bounds(1, 5, 3, 7), [
            [new Pawn(redPlayer, "red"), new Position(2, 5)], // moves
            [new Pawn(yellowPlayer, "yellow"), new Position(1, 6)], // is beaten
        ]),
        move: new Move(new Position(2, 5), new Position(1, 6)),
        want: new Board(new Bounds(1, 5, 3, 7), [
            [new Pawn(redPlayer, "red"), new Position(1, 6)], // moved
        ]),
        wantPlayer: redPlayer,
    },
    {
        name: "deadlock move on smallest board, causes opponent to win",
        activePlayer: greenPlayer,
        board: new Board(new Bounds(3, 3, 5, 5), [
            [new Pawn(redPlayer, "green"), new Position(3, 5)],
            [new Pawn(greenPlayer, "red"), new Position(3, 3)], // moves, becomes knight
        ]),
        move: new Move(new Position(3, 3), new Position(4, 4)),
        want: new Board(new Bounds(3, 3, 5, 5), [
            [new Pawn(redPlayer, "green"), new Position(3, 5)],
            // pawn became knight, can no longer move and was therefore removed
        ]),
        wantPlayer: redPlayer,
    },
    {
        name: "beating move with shrinking to smallest bounds, causes removal of pawn",
        activePlayer: yellowPlayer,
        board: new Board(new Bounds(0, 2, 5, 4), [
            [new Pawn(greenPlayer, "green"), new Position(4, 3)], // is beaten
            [new Pawn(greenPlayer, "yellow"), new Position(3, 4)],
            [new Pawn(yellowPlayer, "blue"), new Position(5, 2)],
            [new Pawn(yellowPlayer, "green"), new Position(0, 3)], // moves, becomes knight and is removed too
        ]),
        move: new Move(new Position(0, 3), new Position(4, 3)),
        want: new Board(new Bounds(3, 2, 5, 4), [
            [new Pawn(greenPlayer, "yellow"), new Position(3, 4)],
            [new Pawn(yellowPlayer, "blue"), new Position(5, 2)],
        ]),
        wantPlayer: greenPlayer,
    },
    {
        name: "move causes shrinking to smallest bounds, which causes removal of other pawn",
        activePlayer: yellowPlayer,
        board: new Board(new Bounds(0, 2, 5, 4), [
            [new Pawn(redPlayer, "green"), new Position(4, 3)], // knight, will be trapped
            [new Pawn(greenPlayer, "yellow"), new Position(3, 4)],
            [new Pawn(yellowPlayer, "blue"), new Position(5, 2)],
            [new Pawn(yellowPlayer, "green"), new Position(0, 3)], // moves
        ]),
        move: new Move(new Position(0, 3), new Position(3, 3)),
        want: new Board(new Bounds(3, 2, 5, 4), [
            [new Pawn(greenPlayer, "yellow"), new Position(3, 4)],
            [new Pawn(yellowPlayer, "blue"), new Position(5, 2)],
            [new Pawn(yellowPlayer, "green"), new Position(3, 3)], // moved
        ]),
        wantPlayer: greenPlayer,
    },
    {
        name: "beating only other pawn, but becoming deadlocked causes winning nonetheless",
        activePlayer: redPlayer,
        board: new Board(new Bounds(4, 2, 6, 4), [
            [new Pawn(redPlayer, "red"), new Position(6, 4)], // moves, becomes knight
            [new Pawn(bluePlayer, "green"), new Position(5, 3)], // is beaten
        ]),
        move: new Move(new Position(6, 4), new Position(5, 3)),
        want: new Board(new Bounds(4, 2, 6, 4), [
            [new Pawn(redPlayer, "red"), new Position(5, 3)], // moved
        ]),
        wantPlayer: redPlayer,
    },
];
