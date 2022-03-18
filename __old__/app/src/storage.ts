import AsyncStorage from '@react-native-community/async-storage';

// -----------------------------------------------------------------------------

/** Provides methods to store any kind of JS data in a local storage. Saved data
 * is persistent and can be retrieved even after reloading the app. */
const storage = {

    /** Retrieves data stored under the `key`. It will return a JS object. No
     * parsing required. */
    read: async function<T>(key: string): Promise<T|null> {
        const data = await AsyncStorage.getItem(key);
        return JSON.parse(data || 'null');
    },

    /** Stores a JS object in the local storage under the given `key`. The
     * object can be passed as is. No `JSON.stringify()` etc. is required. */
    write: async function<T>(key: string, data: T) {
        const storableData = JSON.stringify(data);
        AsyncStorage.setItem(key, storableData);
    },

    /** Deletes data stored under the `key`. This is permanent. Once deleted the
     * data cannot be restored. */
    remove: async function(key: string) {
        AsyncStorage.removeItem(key);
    }
};

export default storage;