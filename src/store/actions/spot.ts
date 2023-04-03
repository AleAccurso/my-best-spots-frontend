import { IFilterConfig } from "@/src/interfaces/filter";
import { SpotActionType } from "@/store/actionTypes/spot";
import { ISpot } from "@/src/interfaces/spot";

export interface GetSpotsAction {
  type: SpotActionType.GETSPOTS;
}
export interface AddSpotAction {
  type: SpotActionType.ADDSPOT;
  payload: ISpot;
}

export type SpotAction = GetSpotsAction | AddSpotAction;
