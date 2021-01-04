/*! type-guards v0.0.2 | MIT | © Hannes Dröse https://github.com/hd-code/js-snippets */

// -----------------------------------------------------------------------------

export function isUndefined(value: unknown): value is undefined {
    return value === undefined;
}

export function isNull(value: unknown): value is null {
    return value === null;
}

// -----------------------------------------------------------------------------

export function isBool(bool: unknown): bool is boolean {
    return typeof bool === 'boolean';
}

export function isInteger(num: unknown): num is number {
    return typeof num === 'number' && Math.floor(num) === num;
}

export function isNumber(num: unknown): num is number {
    return typeof num === 'number';
}

export function isString(str: unknown): str is string {
    return typeof str === 'string';
}

// -----------------------------------------------------------------------------

export function isArray<T>(arr: unknown, typeGuard?: (el: unknown) => el is T): arr is T[] {
    if (!(arr instanceof Array)) {
        return false;
    }

    if (!typeGuard) {
        return true;
    }

    for (let i = 0, ie = arr.length; i < ie; i++) {
        if (!typeGuard(arr[i])) {
            return false;
        }
    }

    return true;
}

export function isObject<T>(obj: unknown): obj is T {
    return typeof obj === 'object' && obj !== null && !(obj instanceof Array);
}

export function hasKey<T>(obj: unknown, key: keyof T, typeGuard?: (el: unknown) => el is T[keyof T]): key is keyof T {
    return typeof obj === 'object' && obj !== null && (key in obj)
        && (!typeGuard || typeGuard((obj as any)[key])); // eslint-disable-line
}