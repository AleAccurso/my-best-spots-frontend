import { ISpotsState, Spot, SpotList } from "@/interfaces/spot";
import { IFilterConfig, IFiltersState } from "@/src/interfaces/filter";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const spots = new SpotList();

spots.addSpot(
  new Spot({
    title: "Grand Place",
    address: "Grote Markt",
    postal_code: "1000",
    city: "Brussel",
    country_code: "BE",
    category: "tourism",
    isShared: false,
  })
);
spots.addSpot(
  new Spot({
    title: "Docks Bruxsel",
    address: "Bd Lambermont 1",
    postal_code: "1000",
    city: "Brussel",
    country_code: "BE",
    category: "shopping",
    isShared: false,
  })
);
spots.addSpot(
  new Spot({
    title: "Delirium Cafe",
    address: "Imp. de la Fidélité 4",
    postal_code: "1000",
    city: "Brussel",
    country_code: "BE",
    category: "cafe-bar",
    isShared: false,
  })
);

const initialState: ISpotsState = {
  availableSpots: new SpotList(),
  loading: true,
};

const fetchAvailableSpots = createAsyncThunk(
  "fetchAvailableCategories",
  async (filterState: IFiltersState, { rejectWithValue }) => {
    const filterConfig: IFilterConfig = {
      categories: filterState.categories.checkboxesConfig,
      country: filterState.countries.selectedCountry,
      regions: filterState.regions.checkboxesConfig,
    };
    try {
      const { data } = await axios.get<Spot[]>("",{data: filterConfig});
      return spots;
    } catch (error: unknown) {
      rejectWithValue(error);
      return spots;
    }
  }
);

const spotSlice = createSlice({
  name: "spotReducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAvailableSpots.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAvailableSpots.fulfilled, (state, action) => {
      if (action.payload && action.payload instanceof SpotList) {
        state.availableSpots = action.payload;
      }
      state.loading = false;
    });
  },
});

export { fetchAvailableSpots };
export default spotSlice.reducer;
