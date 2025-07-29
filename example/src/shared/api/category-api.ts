import { Api } from './api';
import { authApi } from './auth-api';

export class CategoryApi extends Api {
  private readonly authApi = authApi;

  public getList = async (): Promise<Category[]> => {
    await this.authApi.checkAuth();

    const db = await this.getDb();

    return db.from('categories').select({ key: 'categoriesUserId', value: this.userId });
  };

  public create = async (category: Category, userId: Id): Promise<Category> => {
    const db = await this.getDb();

    await this.authApi.checkAuth();

    const id = await db.from('categories').insert<Omit<Category, 'id'>>({ ...category, userId });

    return {
      ...category,
      id,
    };
  };

  public update = async (category: Category): Promise<Category> => {
    const db = await this.getDb();

    await db.from('categories').update(category);
    return category;
  };

  public delete = async (id: number): Promise<boolean> => {
    const db = await this.getDb();

    await db.from('categories').delete({ key: 'id', value: id });

    return true;
  };
}

export const categoryApi = new CategoryApi();
