import { Dispatch } from "react";
import { FilterAction } from "@/store/actions/filter";
import { FilterActionType } from "@/store/actionTypes/filter";

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
