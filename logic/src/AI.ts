import { Color } from "./Color";
import { GameState } from "./GameState";

export class AI {
    static getNextGameState(gs: GameState): GameState {
        const gss = gs.getNext();
        const scores = AI.rateGameStates(gss);
        const bestScoreI = AI.getBestScoreIndex(scores, gs.player);
        return gss[bestScoreI];
    }

    private static rateGameStates(gss: GameState[]): Score[] {
        return gss.map((gs) => AI.maxNIS(gs));
    }

    private static maxNIS(gs: GameState): Score {
        return new Score(0, 0, 0, 0);
    }

    private static getBestScoreIndex(scores: Score[], player: Color): number {
        let score = scores[0].getForPlayer(player),
            scoreI = 0;
        for (let i = 1, ie = scores.length; i < ie; i++) {
            if (scores[i].getForPlayer(player) > score) {
                score = scores[i].getForPlayer(player);
                scoreI = i;
            }
        }
        return scoreI;
    }
}

type ScoreTuple = [number, number, number, number]

class Score {
    private score: ScoreTuple;
    constructor(red: number, green: number, yellow: number, blue: number) {
        this.score = [red, green, yellow, blue];
    }

    getForPlayer(player: Color): number {
        return this.score[player];
    }

    normalize(): Score {
        const sum = this.sum();
        return new Score(...this.score.map(s => s / sum) as ScoreTuple);
    }

    sum(): number {
        return this.score.reduce((sum, s) => sum + s, 0);
    }
}

