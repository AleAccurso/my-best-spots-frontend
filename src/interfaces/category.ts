export interface ICategory {
  category_name: string;
  category_key: string;
}

export interface ICategoryCheckboxOption {
  category: Category;
  isChecked: boolean;
}

export class Category {
  private category_name: string;
  private category_key: string;

  constructor(data: ICategory) {
    this.category_name = data.category_name;
    this.category_key = data.category_key;
  }

  public getCategoryName(): string {
    return this.category_name;
  }

  public getCategoryKey(): string {
    return this.category_key;
  }
}

export class CategoryList {
  private categoryList : Category[];

  constructor() {
    this.categoryList = []
  }

  public getList() : Category[] {
    return this.categoryList
  }

  public countCategories() : number {
    return this.categoryList.length
  }

  public addCategory(category: Category) {
    this.categoryList.push(category)
  }
}