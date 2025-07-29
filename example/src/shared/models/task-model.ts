export class TaskModel {
  id: Id = -1;
  createdAt: Date = new Date();
  name: string = '';
  categoryId: Id = -1;
  isDone: boolean = false;

  constructor(task: Partial<Task>) {
    this.id = task.id ?? this.id;
    this.createdAt = task.createdAt ?? this.createdAt;
    this.name = task.name ?? this.name;
    this.categoryId = task.categoryId ?? this.categoryId;
    this.isDone = task.isDone ?? this.isDone;
  }

  public cloneWith = (task: Partial<Task>): TaskModel => {
    return new TaskModel({ ...this, ...task });
  };

  public validate = () => {
    if (!this.name) {
      throw new Error('Name is required');
    }
  };

  public toJson = (): Task => {
    return {
      id: this.id,
      createdAt: this.createdAt,
      name: this.name,
      categoryId: this.categoryId,
      isDone: this.isDone,
    };
  };

  static fromJson = (task: Partial<Task>): TaskModel => {
    return new TaskModel(task);
  };
}
