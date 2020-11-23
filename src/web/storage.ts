import Storage from '../storage';

// -----------------------------------------------------------------------------

const WebStorage: Storage = { delete: del, read, write };

export default WebStorage;

// -----------------------------------------------------------------------------

async function del(key: string): Promise<void> {
    return new Promise((resolve, reject) => setTimeout(() => {
        try {
            localStorage.removeItem(key);
            resolve();
        } catch (err) {
            reject(err);
        }
    }, 1));
}

async function read<T>(key: string): Promise<T> {
    return new Promise<T>((resolve, reject) => setTimeout(() => {
        try {
            const data = localStorage.getItem(key);
            if (!data) {
                throw 'No data in storage under key: ' + key;
            }

            const result = JSON.parse(data);
            resolve(result);
        } catch (err) {
            reject(err);
        }
    }, 1));
}

async function write<T>(key: string, data: T): Promise<void> {
    return new Promise((resolve, reject) => setTimeout(() => {
        try {
            const storableData = JSON.stringify(data);
            localStorage.setItem(key, storableData);
            resolve();
        } catch (err) {
            reject(err);
        }
    }, 1));
}