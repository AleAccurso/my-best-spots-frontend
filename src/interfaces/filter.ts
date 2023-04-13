import { Category, CategoryList, ICategory } from "@/interfaces/category";
import { IRegion, IRegionCheckboxOption } from "@/interfaces/region";
import { ICategoryCheckboxOption } from "@/interfaces/category";

export interface IFilterConfig {
  categories: ICategoryCheckboxOption[];
  country: string;
  regions: IRegionCheckboxOption[];
}

export interface IFiltersState {
  categories: {
    loading: boolean;
    availableCategories: CategoryList;
    checkboxesConfig: ICategoryCheckboxOption[];
  };
  countries: {
    loading: boolean;
    availableCountries: string[];
    selectedCountry: string;
  };
  regions: {
    loading: boolean;
    availableRegions: IRegion[];
    checkboxesConfig: IRegionCheckboxOption[];
  };
}

export interface IFiltersProps {
  filtersData: IFiltersState;
}
