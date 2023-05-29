import { Category } from "@/interfaces/category";
import { IRegionCheckboxOption, RegionList } from "@/interfaces/region";
import { CategoryCheckboxOption } from "@/interfaces/category";

export interface IFilterConfig {
  categories: CategoryCheckboxOption[];
  country: string;
  regions: IRegionCheckboxOption[];
}

export interface IFiltersState {
  categories: {
    availableCategories: Category[];
    checkboxesConfig: CategoryCheckboxOption[];
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
