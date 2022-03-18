/** An interface for accessing some kind of persistent storage. Objects can be
 * saved and retrieved under a specific key. */
export interface AsyncStorage {
    /** Removes anything stored under `key` from storage. The promise will only
     * reject, when the storage is unaccessible. If there is no value stored
     * for the key, the promise will resolve regardless.*/
    delete: (key: string) => Promise<void>;
    /** Will return a stored value from the storage. Promise rejects only if the
     * storage is unaccessible. If there is no value stored for the key, null is
     * returned. */
    read: <T>(key: string) => Promise<T>;
    /** Will store an object in the storage under the given key. The object can
     * be passed as is. The promise will reject, if the value could not be
     * stored. */
    write: <T>(key: string, value: T) => Promise<void>;
}
