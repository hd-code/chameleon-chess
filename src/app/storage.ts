import Storage from 'storage';

// -----------------------------------------------------------------------------

const AppStorage: Storage = { delete: del, read, write };

export default AppStorage;

// -----------------------------------------------------------------------------

async function del(key: string): Promise<void> {
    return new Promise((resolve, reject) => setTimeout(() => {
        try {
            // TODO
            resolve();
        } catch (err) {
            reject(err);
        }
    }, 1));
}

async function read<T>(key: string): Promise<T> {
    return new Promise<T>((resolve, reject) => setTimeout(() => {
        try {
            const data = '{}'; // TODO
            if (!data) {
                resolve(null);
                return;
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
            // TODO
            resolve();
        } catch (err) {
            reject(err);
        }
    }, 1));
}