/** An enum which represents different levels of difficulty for the computer
 * opponent. */
export enum AILevel {
    easy,
    normal,
    hard,
}

export function getNthBestMoveToSelect(level: AILevel): number {
    const propForMove = Math.random();
    const prop = levelToPropForBestMove[level];
    let limit = 1 - prop;

    let result = 0;
    while (propForMove < limit) {
        limit *= 1 - prop;
        result++;
    }

    return result;
}

const levelToPropForBestMove = {
    [AILevel.easy]: 0.5,
    [AILevel.normal]: 0.9,
    [AILevel.hard]: 1,
};
