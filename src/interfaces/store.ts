import { IFiltersState } from "@/interfaces/filter";
import { ISpotsState } from "@/interfaces/spot";
import { ICommonState } from "@/interfaces/common";

export interface CombinedState {
  common: ICommonState;
  filters: IFiltersState;
  spots: ISpotsState;
};