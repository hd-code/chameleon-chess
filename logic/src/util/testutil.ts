/*! testutil v0.0.4 | MIT | https://github.com/hd-code/web-snippets */

/**
 * @file
 * This file contains helpful functions for testing. It is compatible Mocha and
 * Jest.
 */
import * as assert from "assert";

// -----------------------------------------------------------------------------

/**
 * Tests a pure function against a list of test cases. Pure functions have no
 * side effects and their return value only depends on the input parameters.
 * @param fn The function to be tested.
 * @param cases An array of test cases. A test case is a tuple with two entries.
 * The first are the params (as an array) and the second is the expected return
 * value.
 *
 * Or a map of named test cases. The key is the name of the case. The
 * value is a tuple with two entries. The first are the params (as an array) and
 * the second is the expected return value.
 */
export function testFunc<Args extends unknown[], Return>(
    fn: (...args: Args) => Return,
    cases: [Args, Return][] | { [name: string]: [Args, Return] },
) {
    const testCases = cases instanceof Array ? toCaseMap(cases) : cases;

    describe(fn.name, () => {
        for (const name in testCases) {
            const args = testCases[name][0];
            const want = testCases[name][1];

            it(name, () => {
                const got = fn(...args);
                if (typeof got === "object") {
                    assert.deepStrictEqual(got, want);
                } else {
                    assert.strictEqual(got, want);
                }
            });
        }
    });
}

// -----------------------------------------------------------------------------

type RecursiveArray<Type> = Array<RecursiveArray<Type> | Type>;

export function testFuncClose<
    Args extends unknown[],
    Return extends number | RecursiveArray<number>,
>(
    fn: (...args: Args) => Return,
    cases: [Args, Return][] | { [name: string]: [Args, Return] },
    delta: number,
) {
    const testCases = cases instanceof Array ? toCaseMap(cases) : cases;

    describe(fn.name, () => {
        for (const name in testCases) {
            const args = testCases[name][0];
            const want = testCases[name][1];

            it(name, () => {
                const got = fn(...args);
                if (typeof got !== typeof want) {
                    const structError = new assert.AssertionError({
                        actual: got,
                        expected: want,
                        message:
                            "Returned value does not match expected structure",
                    });
                    assert.fail(structError);
                }

                if (typeof want === "number") {
                    assert.ok(isClose(got as number, want, delta));
                } else {
                    const gotFlat = flatten(got as RecursiveArray<number>);
                    const wantFlat = flatten(want);
                    if (gotFlat.length !== wantFlat.length) {
                        assert.fail(
                            "Returned value does not match expected structure",
                        );
                    }
                    assert.ok(isCloseArray(gotFlat, wantFlat, delta));
                }
            });
        }
    });
}

// -----------------------------------------------------------------------------

function toCaseMap<Args extends unknown[], Return>(
    cases: [Args, Return][],
): { [name: string]: [Args, Return] } {
    const result: { [name: string]: [Args, Return] } = {};
    cases.forEach((testCase) => {
        const name = getName(testCase);
        result[name] = testCase;
    });
    return result;
}

// -----------------------------------------------------------------------------

function getName<Args extends unknown[], Return>(
    testCase: [Args, Return],
): string {
    return `(${toString(testCase[0]).slice(1, -1)}) => ${toString(
        testCase[1],
    )}`;
}

function toString<T>(value: T, maxLen = 38, minLen = 5): string {
    if (value instanceof Array) {
        const len = Math.max(minLen, Math.floor(maxLen / value.length));
        const string = value.map((v) => toString(v, len)).join(",");
        return `[${clipString(string, maxLen - 2)}]`;
    }

    if (typeof value === "object") {
        const entries = extractEntries(value);
        const len = Math.max(minLen, Math.floor(maxLen / entries.length / 2));
        const string = entries
            .map((e) => `${toString(e[0], len)}:${toString(e[1], len)}`)
            .join(",");
        return `{${clipString(string, maxLen - 2)}}`;
    }

    return clipString("" + value, maxLen);
}

function clipString(string: string, maxLen: number): string {
    return string.length <= maxLen ? string : string.slice(0, maxLen - 1) + "…";
}

function extractEntries<T>(obj: T): [keyof T, T[keyof T]][] {
    const result: [keyof T, T[keyof T]][] = [];
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            result.push([key, obj[key]]);
        }
    }
    return result;
}

// -----------------------------------------------------------------------------

function flatten(input: RecursiveArray<number>): number[] {
    const result = [];
    for (let i = 0, ie = input.length; i < ie; i++) {
        const entry = input[i];
        if (entry instanceof Array) {
            const append = flatten(entry);
            result.push(...append);
        } else {
            result.push(entry);
        }
    }
    return result;
}

function isClose(x: number, y: number, delta: number): boolean {
    return Math.abs(x - y) < delta;
}

function isCloseArray(x: number[], y: number[], delta: number): boolean {
    for (let i = 0, ie = x.length; i < ie; i++) {
        if (!isClose(x[i], y[i], delta)) {
            return false;
        }
    }
    return true;
}
