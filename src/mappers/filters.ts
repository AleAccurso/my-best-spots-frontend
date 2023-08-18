import { IFiltersState, FiltersConfig } from "@/interfaces/filter";
import {
  CategoryCheckboxConfig,
  CategoryCheckboxOption,
} from "../interfaces/category";
import {
  IRegionCheckboxOption,
  RegionCheckboxConfig,
} from "../interfaces/region";

function mapCategoryFilterToConfig(
  categoryFilter: CategoryCheckboxOption[]
): CategoryCheckboxConfig[] {
  let categoryConfigList = [] as CategoryCheckboxConfig[];
  categoryFilter.forEach((categoryCheckboxConfig) => {
    categoryConfigList.push({
      category_key: categoryCheckboxConfig.category.category_key,
      isChecked: categoryCheckboxConfig.isChecked,
    } as CategoryCheckboxConfig);
  });
  return categoryConfigList;
}

function mapRegionFilterToConfig(
  regionFilter: IRegionCheckboxOption[]
): RegionCheckboxConfig[] {
  let regionConfigList = [] as RegionCheckboxConfig[];
  regionFilter.forEach((regionCheckboxConfig) => {
    regionConfigList.push({
      region_key: regionCheckboxConfig.region.getRegionKey(),
      isChecked: regionCheckboxConfig.isChecked,
    } as RegionCheckboxConfig);
  });
  return regionConfigList;
}

export function mapFilterStateToConfig(
  filterState: IFiltersState
): FiltersConfig {
  let filterConfig = {
    categories: mapCategoryFilterToConfig(
      filterState.categories.checkboxesConfig
    ),
    country: filterState.countries.selectedCountry,
    regions: mapRegionFilterToConfig(filterState.regions.checkboxesConfig),
  } as FiltersConfig;

  return filterConfig;
}
