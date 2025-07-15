export {};

declare global {
  export type Id = number;

  export type Category = {
    id: Id;
    createdAt: Date;
    name: string;
    userId: Id;
  };

  export type Task = {
    id: Id;
    createdAt: Date;
    name: string;
    categoryId: Id;
    isDone: boolean;
  };

  export type User = {
    id: Id;
    createdAt: Date;
    login: string;
    password: string;
  };

  export type AuthItem = {
    id: Id;
    createdAt: Date;
    userId: Id;
    refreshMs: number;
    accessMs: number;
  };
}
