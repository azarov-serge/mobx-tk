import { QueryError } from 'mobx-tk';
import { Api } from './api';

export class UserApi extends Api {
  public fetchUsers = async (): Promise<User[]> => {
    const db = await this.getDb();

    return db.from('users').select();
  };

  public fetchUser = async (id: number): Promise<User> => {
    const db = await this.getDb();
    const [user] = await db.from('users').select<User>({ key: 'id', value: id });

    if (!user) {
      throw new QueryError({
        status: 404,
        message: 'User not found',
      });
    }

    return user;
  };

  public createUser = async (user: User): Promise<User> => {
    const db = await this.getDb();
    delete (user as Record<string, unknown>).id;
    const id = await db.from('users').insert<Omit<User, 'id'>>(user);

    return {
      ...user,
      password: '',
      id,
    };
  };

  public updateUser = async (user: User): Promise<User> => {
    const db = await this.getDb();
    await db.from('users').update(user);
    return user;
  };

  public deleteUser = async (id: number): Promise<boolean> => {
    const db = await this.getDb();
    await db.from('users').delete({ key: 'id', value: id });

    return true;
  };
}

export const userApi = new UserApi();
