import { ICategoryCheckboxOption } from "@/src/interfaces/category";
import { FilterActionType } from "@/store/actionTypes/filter";

export interface GetFiltersConfigAction {
  type: FilterActionType.GETFILTERSCONFIG;
}

export interface GetAvailableCategoriesAction {
  type: FilterActionType.GETAVAILABLECATEGORIES;
}

export interface GetAvailableCountriesAction {
  type: FilterActionType.GETAVAILABLECOUNTRIES;
}

export interface GetAvailableRegionsAction {
  type: FilterActionType.GETAVAILABLEREGIONS;
}

export interface SetCategoryFilterConfigAction {
  type: FilterActionType.SETCATEGORYFILTERCONFIG;
  payload: ICategoryCheckboxOption[];
}

export interface SetSelectedCountryAction {
  type: FilterActionType.SETSELECTEDCOUNTRY;
  payload: string;
}

export type FilterAction =
  | GetFiltersConfigAction
  | GetAvailableCategoriesAction
  | GetAvailableCountriesAction
  | GetAvailableRegionsAction
  | SetCategoryFilterConfigAction
  | SetSelectedCountryAction;
