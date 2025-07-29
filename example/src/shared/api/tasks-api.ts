import { Api } from './api';
import { authApi } from './auth-api';

export class TasksApi extends Api {
  private readonly authApi = authApi;

  public getList = async (): Promise<Task[]> => {
    const db = await this.getDb();

    await this.authApi.checkAuth();

    return db.from('tasks').select();
  };

  public create = async (task: Task): Promise<Task> => {
    const db = await this.getDb();
    const id = await db.from('tasks').insert<Omit<Task, 'id'>>(task);

    return {
      ...task,
      id,
    };
  };

  public update = async (task: Task): Promise<Task> => {
    const db = await this.getDb();

    await this.authApi.checkAuth();

    await db.from('tasks').update(task);
    return task;
  };

  public delete = async (id: number): Promise<boolean> => {
    const db = await this.getDb();

    await this.authApi.checkAuth();

    await db.from('tasks').delete({ key: 'id', value: id });

    return true;
  };
}

export const tasksApi = new TasksApi();
