import { IndexedDbClient } from '@azarov-serge/indexed-db-client';
import { delay } from 'mobx-tk';
import { db, StorageName, StorageIndexName } from './db';

export const BASE_URL = 'http://localhost:3001';

export abstract class Api {
  private readonly db: IndexedDbClient<StorageName, StorageIndexName>;
  protected userId: Id = -1;
  protected readonly delay = delay;

  constructor() {
    this.db = db;
  }

  public getDb = async () => {
    if (!this.db.isInited) {
      await this.db.init();
    }

    return this.db;
  };
}
