export interface ICategory {
  name: string;
  category_key: string;
}

export interface ICategoryCheckboxOption {
  category_key: string;
  category_name: string;
  value: boolean;
}

export interface ICategoryFilterProps {
  filterData : {
    availableCategories: ICategory[];
    checkboxesConfig: ICategoryCheckboxOption[];
  };
}
