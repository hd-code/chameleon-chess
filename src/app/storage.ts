import Storage from "core/storage";

export default <Storage>{ delete: del, read, write };

// -----------------------------------------------------------------------------

async function del(key: string): Promise<void> {
  return new Promise((resolve, reject) =>
    setTimeout(() => {
      try {
        // TODO
        console.log(key);
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
        console.log(key);
        const data = "{}"; // TODO
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
        console.log(key, storableData);
        // TODO
        resolve();
      } catch (err) {
        reject(err);
      }
    }, 1),
  );
}
