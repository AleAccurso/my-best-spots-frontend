import { CategoryList } from "@/interfaces/category";
import { IRegionCheckboxOption, RegionList } from "@/interfaces/region";
import { ICategoryCheckboxOption } from "@/interfaces/category";

export interface IFilterConfig {
  categories: ICategoryCheckboxOption[];
  country: string;
  regions: IRegionCheckboxOption[];
}

export interface IFiltersState {
  categories: {
    availableCategories: CategoryList;
    checkboxesConfig: ICategoryCheckboxOption[];
  };
  countries: {
    availableCountries: string[];
    selectedCountry: string;
  };
  regions: {
    availableRegions: RegionList;
    checkboxesConfig: IRegionCheckboxOption[];
  };
}

export interface IFiltersProps {
  filtersData: IFiltersState;
}
