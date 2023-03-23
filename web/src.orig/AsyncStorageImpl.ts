import { AsyncStorage } from "./state/AsyncStorage";

export class AsyncStorageImpl implements AsyncStorage {
    async delete(key: string): Promise<void> {
        window.localStorage.removeItem(key);
    }

    async read<T>(key: string): Promise<T | undefined> {
        return new Promise((resolve, reject) => {
            const result = window.localStorage.getItem(key);
            if (result === null) {
                reject(`${key} is not in localStorage`);
                return;
            }

            try {
                resolve(JSON.parse(result));
            } catch (e) {
                reject(e);
            }
        });
    }

    async write<T>(key: string, value: T): Promise<void> {
        const obj = JSON.stringify(value);
        window.localStorage.setItem(key, obj);
    }
}
