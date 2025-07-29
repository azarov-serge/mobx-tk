export class CategoryModel {
  id: Id = -1;
  createdAt: Date = new Date();
  name: string = '';
  userId: Id = -1;

  constructor(category: Partial<Category>) {
    this.id = category.id ?? this.id;
    this.createdAt = category.createdAt ?? this.createdAt;
    this.name = category.name ?? this.name;
    this.userId = category.userId ?? this.userId;
  }

  public cloneWith = (category: Partial<Category>): CategoryModel => {
    return new CategoryModel({ ...this, ...category });
  };

  public validate = () => {
    if (!this.name) {
      throw new Error('Name is required');
    }
  };

  public toJson = (): Category => {
    return {
      id: this.id,
      createdAt: this.createdAt,
      name: this.name,
      userId: this.userId,
    };
  };

  static fromJson = (category: Partial<Category>): CategoryModel => {
    return new CategoryModel(category);
  };
}
