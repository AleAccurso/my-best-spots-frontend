export interface ICategory {
    name: string;
    category_key: string;
}

export interface ICategoryCheckboxOption {
  category_key: string;
  value: boolean;
}

export interface ICategoryFilterProps {
  categories: ICategory[];
}