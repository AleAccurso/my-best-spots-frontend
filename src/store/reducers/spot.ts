import { IAddSpotFormData } from "@/components/AddSpot";
import { SpotResDTO, isCreatedSpot } from "@/interfaces/spot";
import {
  ISpotsState,
  SpotPagingResDTO,
  isSpotPagingResDTO,
} from "@/interfaces/spot";
import { axiosInstance } from "@/src/hooks/axios";
import { FiltersConfig } from "@/src/interfaces/filter";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Router from "next/router";

const initialState: ISpotsState = {
  availableSpots: [],
  loading: true,
};

const fetchAvailableSpots = createAsyncThunk(
  "fetchAvailableSpots",
  async (filterConfig: FiltersConfig, { rejectWithValue }) => {
    try {
      const response = (await axiosInstance()).get<SpotPagingResDTO>("/spots", {
        params: filterConfig,
      });
      return (await response).data;
    } catch (error: unknown) {
      rejectWithValue(error);
    }
  }
);

const insertSpot = createAsyncThunk(
  "insertSpot",
  async (newSpotData: IAddSpotFormData, { rejectWithValue }) => {
    try {
      const response = (await axiosInstance()).post<SpotResDTO>(
        "/spots",
        newSpotData
      );
      return (await response).data;
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
      if (action.payload && isSpotPagingResDTO(action.payload)) {
        state.availableSpots = action.payload.data;
      }
      state.loading = false;
    });
    builder.addCase(insertSpot.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(insertSpot.fulfilled, (state, action) => {
      if (action.payload && isCreatedSpot(action.payload)) {
        Router.push("/");
      }
      state.loading = false;
    });
  },
});

export { fetchAvailableSpots, insertSpot };
export default spotSlice.reducer;
