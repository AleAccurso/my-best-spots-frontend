import { Dispatch } from "redux";
import { SpotActionType } from "@/store/actionTypes/spot";
import { SpotAction } from "@/store/actions/spot";
import { ISpot } from "@/src/interfaces/spot";
import { IFilterConfig } from "@/src/interfaces/filter";

export const getSpots = () => {
  return (dispatch: Dispatch<SpotAction>) => {
    dispatch({
      type: SpotActionType.GETSPOTS,
    });
  };
};

export const addSpots = (newSpot: ISpot) => {
  return (dispatch: Dispatch<SpotAction>) => {
    dispatch({
      type: SpotActionType.ADDSPOT,
      payload: newSpot,
    });
  };
};
