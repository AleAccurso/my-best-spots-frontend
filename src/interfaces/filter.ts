import { ICategory } from "@/interfaces/category";
import { IRegion, IRegionCheckboxOption } from "@/interfaces/region";
import { ICategoryCheckboxOption } from "@/interfaces/category";

export interface IFilterConfig {
  categories: ICategoryCheckboxOption[];
  country: string;
  regions: IRegionCheckboxOption[];
}

export interface IFiltersState {
  categories: {
    availableCategories: ICategory[];
    checkboxesConfig: ICategoryCheckboxOption[];
  };
  countries: {
    availableCountries: string[];
    selectedCountry: string;
  };
  regions: {
    availableRegions: IRegion[];
    checkboxesConfig: IRegionCheckboxOption[];
  };
}

export interface IFiltersProps {
  filtersData: IFiltersState;
}
