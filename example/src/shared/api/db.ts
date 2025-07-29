import { IndexedDbClient, IDBConfig, StorageIndex } from '@azarov-serge/indexed-db-client';

export const DB_NAME = 'tasksManager';
export const DB_VERSION = 1;

export const storageNames = ['users', 'auth', 'categories', 'tasks'];

export type StorageName = (typeof storageNames)[number];

/** Fields available for index search */
type StorageUserIndex = `users${Capitalize<Extract<keyof User, 'login' | 'createdAt'>>}`;
type StorageAuthIndex = `auth${Capitalize<Extract<keyof AuthItem, 'userId'>>}`;
type StorageCategoryIndex =
  `categories${Capitalize<Extract<keyof Category, 'name' | 'createdAt' | 'userId'>>}`;
type StorageTaskIndex = `tasks${Capitalize<Extract<keyof Task, 'name' | 'createdAt'>>}`;

export type StorageIndexName =
  | StorageUserIndex
  | StorageAuthIndex
  | StorageCategoryIndex
  | StorageTaskIndex;

export const storeNameToIndexes: Record<StorageName, StorageIndex<StorageIndexName>[]> = {
  users: [
    { index: 'usersLogin', key: 'login' },
    { index: 'usersCreatedAt', key: 'createdAt' },
  ],
  auth: [{ index: 'authUserId', key: 'userId' }],
  categories: [
    { index: 'categoriesName', key: 'name' },
    { index: 'categoriesCreatedAt', key: 'createdAt' },
    { index: 'categoriesUserId', key: 'userId' },
  ],
  tasks: [
    { index: 'tasksName', key: 'name' },
    { index: 'tasksCreatedAt', key: 'createdAt' },
  ],
};

export type Indexes = (typeof storageNames)[number];

export const indexedDbConfig: IDBConfig<StorageName, StorageIndexName> = {
  dbName: DB_NAME,
  dbVersion: DB_VERSION,
  storageNames,
  storeNameToIndexes,
};

export const db = new IndexedDbClient(indexedDbConfig);
