import { Dispatch } from "react";
import { FilterAction } from "@/store/actions/filter";
import { FilterActionType } from "@/store/actionTypes/filter";
import { ICategoryCheckboxOption } from "@/src/interfaces/category";

export const getAvailableCategories = () => {
  return (dispatch: Dispatch<FilterAction>) => {
    dispatch({
      type: FilterActionType.GETAVAILABLECATEGORIES,
    });
  };
};

export const getAvailableCountries = () => {
  return (dispatch: Dispatch<FilterAction>) => {
    dispatch({
      type: FilterActionType.GETAVAILABLECOUNTRIES,
    });
  };
};

export const getAvailableRegions = () => {
  return (dispatch: Dispatch<FilterAction>) => {
    dispatch({
      type: FilterActionType.GETAVAILABLEREGIONS,
    });
  };
};

export const setCategoryFilterConfig = (
  categoryFilterConfig: ICategoryCheckboxOption[]
) => {
  return (dispatch: Dispatch<FilterAction>) => {
    dispatch({
      type: FilterActionType.SETCATEGORYFILTERCONFIG,
      payload: categoryFilterConfig,
    });
  };
};

export const setSelectedCountry = (country: string) => {
  return (dispatch: Dispatch<FilterAction>) => {
    dispatch({
      type: FilterActionType.SETSELECTEDCOUNTRY,
      payload: country
    });
  };
};
