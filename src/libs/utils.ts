export function formatDate(input: string): string {
  const date = new Date(input);

  if (isNaN(date.getTime())) {
    throw new Error('Invalid date format');
  }

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
}

export function getFromIDB<T>(
  dbName: string,
  storeName: string,
  key: string
): Promise<T | undefined> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      // Create the object store if it doesn't already exist
      if (!db.objectStoreNames.contains(storeName)) {
        const objectStore = db.createObjectStore(storeName, { keyPath: 'key' });
        objectStore.createIndex(key, 'key', { unique: true });
      }
    };

    request.onsuccess = () => {
      const db = request.result;

      // Ensure the store exists before proceeding with the transaction
      if (!db.objectStoreNames.contains(storeName)) {
        db.close();
        reject(new Error(`Object store "${storeName}" not found in the database "${dbName}".`));
        return;
      }

      try {
        const transaction = db.transaction(storeName, 'readonly');
        const store = transaction.objectStore(storeName);

        const getRequest = store.get(key);

        getRequest.onsuccess = () => {
          resolve(getRequest.result ? getRequest.result.value : undefined);
        };

        getRequest.onerror = () => reject(getRequest.error);
        transaction.oncomplete = () => db.close();
      } catch (error) {
        reject(error);
      }
    };

    request.onerror = () => reject(request.error);
  });
}

export function storeToIDB(
  dbName: string,
  storeName: string,
  key: string,
  value: any,
  version: number = 2
): Promise<void> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, version);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      // Create the object store if it doesn't already exist
      if (!db.objectStoreNames.contains(storeName)) {
        const objectStore = db.createObjectStore(storeName, { keyPath: 'key' });
        objectStore.createIndex(key, 'key', { unique: true });
      }
    };

    request.onsuccess = () => {
      const db = request.result;

      // Ensure the object store exists before proceeding
      if (!db.objectStoreNames.contains(storeName)) {
        db.close();
        reject(new Error(`Object store "${storeName}" not found in the database "${dbName}".`));
        return;
      }

      try {
        const transaction = db.transaction(storeName, 'readwrite');
        const store = transaction.objectStore(storeName);

        store.put({ key, value });

        transaction.oncomplete = () => {
          console.log(`Data successfully stored in "${storeName}" with key "${key}".`);
          resolve();
          db.close();
        };

        transaction.onerror = () => {
          console.error('Transaction error:', transaction.error);
          reject(transaction.error);
        };
      } catch (error) {
        reject(error);
      }
    };

    request.onerror = () => {
      console.error('Failed to open IndexedDB:', request.error);
      reject(request.error);
    };
  });
}

export function clearIndexedDB(databaseName: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.deleteDatabase(databaseName);

    request.onsuccess = () => {
      console.log(`Database ${databaseName} deleted successfully`);
      resolve();
    };

    request.onerror = (event) => {
      console.error(`Error deleting database ${databaseName}`, event);
      reject(event);
    };

    request.onblocked = () => {
      console.warn(
        `Deletion of database ${databaseName} is blocked. Please close other tabs using the database.`
      );
    };
  });
}

export async function deleteAllIndexedDBs(): Promise<void> {
  // Check if the `indexedDB.databases` method is supported (it may not be supported in all browsers)
  if (!indexedDB.databases) {
    console.warn('indexedDB.databases() is not supported in this browser.');
    return;
  }

  try {
    // Get the list of all databases
    const databases = await indexedDB.databases();

    // Iterate over each database and delete it
    for (const db of databases) {
      if (db.name) {
        const request = indexedDB.deleteDatabase(db.name);
        request.onsuccess = () => {
          console.log(`Database ${db.name} deleted successfully`);
        };
        request.onerror = (event) => {
          console.error(`Error deleting database ${db.name}`, event);
        };
      }
    }
  } catch (error) {
    console.error('Error retrieving databases:', error);
  }
}
