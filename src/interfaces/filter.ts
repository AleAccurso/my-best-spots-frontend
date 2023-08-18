import { CategoryCheckboxConfig, CategoryDTO } from "@/interfaces/category";
import {
  RegionCheckboxConfig,
  IRegionCheckboxOption,
  RegionList,
} from "@/interfaces/region";
import { CategoryCheckboxOption } from "@/interfaces/category";

export interface FiltersConfig {
  categories: CategoryCheckboxConfig[];
  country: string;
  regions: RegionCheckboxConfig[];
}

export interface IFiltersState {
  categories: {
    availableCategories: CategoryDTO[];
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
