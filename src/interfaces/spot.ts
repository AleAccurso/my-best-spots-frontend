export interface ISpot {
  title: string;
  address: string;
  postal_code: string;
  city: string;
  country_code: string;
  category: string;
  isShared: boolean;
}

export interface ISpotProps {
  spotData: ISpot;
}

export interface ISpotsListProps {
  spotListData: ISpot[];
}

export interface ISpotsState {
  availableSpots: ISpot[];
  loading: boolean;
}