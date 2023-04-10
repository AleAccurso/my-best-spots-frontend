import { ISpot, ISpotsState } from "@/interfaces/spot";
import { createSlice } from "@reduxjs/toolkit";

const spots: ISpot[] = [
  {
    title: "Grand Place",
    address: "Grote Markt",
    postal_code: "1000",
    city: "Brussel",
    country_code: "BE",
    category: "tourism",
    isShared: false,
  },
  {
    title: "Docks Bruxsel",
    address: "Bd Lambermont 1",
    postal_code: "1000",
    city: "Brussel",
    country_code: "BE",
    category: "shopping",
    isShared: false,
  },
  {
    title: "Delirium Cafe",
    address: "Imp. de la Fidélité 4",
    postal_code: "1000",
    city: "Brussel",
    country_code: "BE",
    category: "cafe-bar",
    isShared: false,
  },
];

const initialState: ISpotsState = {
  availableSpots: [],
};

const spotSlice = createSlice({
  name: "spotReducer",
  initialState,
  reducers: {
    fetchAvailableSpots: (state) => {
      state.availableSpots = spots;
    },
    getSpots: (state) => {
      state.availableSpots;
    },
  },
});

export const { fetchAvailableSpots, getSpots } = spotSlice.actions;
export default spotSlice.reducer;
