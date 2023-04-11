import { ISpot, ISpotsState } from "@/interfaces/spot";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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
  availableSpots: spots,
  loading: true,
};

const fetchAvailableSpots = createAsyncThunk(
  "fetchAvailableCategories",
  (data, { rejectWithValue }) => {
    try {
      // const { data } = await axios.get<ICategory[]>("");
      return spots;
    } catch (error: unknown) {
      rejectWithValue(error);
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
      if (action.payload) {
        state.availableSpots = action.payload;
        console.log("🚀 ~ builder.addCase ~ payload:", action.payload);
      }
      state.loading = false;
    });
  },
});

export { fetchAvailableSpots };
export default spotSlice.reducer;
