import { render } from '../render';
import storage from '../storage';

import { getView } from './view';

import * as ccl from 'chameleon-chess-logic';
import * as cclExt from '../models/game';
import { TPlayers } from '../models/players';
import { EView } from '../models/view';

// -----------------------------------------------------------------------------

/** Returns the game from the game cache. */
export function getGame() {
    return game;
}

/** Returns true if a new game was created and stored in the cache. */
export function onBeginGame(players: TPlayers): boolean {
    const newGame = cclExt.createGame(players);
    if (!newGame) return false;

    saveGame(newGame);
    return true;
}

/** Returns true if a move was made and the game has advanced. */
export function onPressBoard(pawnIndex: number, clickPos: ccl.IPosition): boolean {
    if (!game) {
        console.warn('controller/game.ts: No stored game!')
        return false;
    }

    if (cclExt.isComputerMove(game)) return false;

    const newGame = cclExt.makeMove(game, pawnIndex, clickPos);
    if (!newGame) return false;

    saveGame(newGame);
    render();
    return true;
}

/** Handles game over and computer moves. Calls `onComputerMove` immediately
 * before a computer move is performed.*/
export function onGameRender(onComputerMove: () => void) {
    if (!game) return console.warn('controller/game.ts: No stored game!');

    if (ccl.isGameOver(game)) {
        removeGame();
        return;
    }

    if (cclExt.isComputerMove(game)) {
        setTimeout(() => {
            doComputerMove(onComputerMove);
        }, 10);
    }
}

// -----------------------------------------------------------------------------

const storageKey = 'game';
const computerTurnLength = 1000; // in milliseconds

let game: cclExt.IGameExt|null = null;

async function doComputerMove(onComputerMove: () => void) {
    if (!game || !cclExt.isComputerMove(game)) return;

    const begin = new Date().getTime();
    const newGame = await cclExt.makeComputerMove(game);
    const end = new Date().getTime();

    // Do not do computer move immediately, but wait for a small amount of time.
    setTimeout(() => {
        // only save new game if still on game view
        if (getView() === EView.GAME) {
            saveGame(newGame);
            onComputerMove();
            render();
        }
    }, Math.max(computerTurnLength - (end - begin)), 1);
}

async function saveGame(newGame: cclExt.IGameExt) {
    game = newGame;
    storage.write(storageKey, game);
}

async function removeGame() {
    game = null;
    storage.remove(storageKey);
}

async function loadGame() {
    const storedGame = await storage.read(storageKey);
    if (cclExt.isGame(storedGame)) {
        game = storedGame;
    }
}

// -----------------------------------------------------------------------------

// Load stored game the first time this file is retrieved.
loadGame().then(render).catch(e => console.log(e));