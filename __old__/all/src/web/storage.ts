import Storage from "core/storage";

export default <Storage>{ delete: del, read, write };

// -----------------------------------------------------------------------------

async function del(key: string): Promise<void> {
  return new Promise((resolve, reject) =>
    setTimeout(() => {
      try {
        localStorage.removeItem(storagePrefix + key);
        resolve();
      } catch (err) {
        reject(err);
      }
    }, 1),
  );
}

async function read<T>(key: string): Promise<T> {
  return new Promise<T>((resolve, reject) =>
    setTimeout(() => {
      try {
        const data = localStorage.getItem(storagePrefix + key);
        if (!data) {
          resolve((null as unknown) as T);
          return;
        }

        const result = JSON.parse(data);
        resolve(result);
      } catch (err) {
        reject(err);
      }
    }, 1),
  );
}

async function write<T>(key: string, data: T): Promise<void> {
  return new Promise((resolve, reject) =>
    setTimeout(() => {
      try {
        const storableData = JSON.stringify(data);
        localStorage.setItem(storagePrefix + key, storableData);
        resolve();
      } catch (err) {
        reject(err);
      }
    }, 1),
  );
}

const storagePrefix = "chameleon-chess_";
