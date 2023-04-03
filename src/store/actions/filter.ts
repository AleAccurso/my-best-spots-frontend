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

export interface UpdateFilterConfigAction {
  type: FilterActionType.UPDATEFILTERCONFIG;
}

export type FilterAction =
  | GetFiltersConfigAction
  | GetAvailableCategoriesAction
  | GetAvailableCountriesAction
  | GetAvailableRegionsAction
  | UpdateFilterConfigAction;
