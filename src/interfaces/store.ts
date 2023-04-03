import { IFiltersState } from "@/interfaces/filter";
import { ISpotsState } from "@/interfaces/spot";

export interface CombinedState {
  filters: IFiltersState;
  spots: ISpotsState;
};