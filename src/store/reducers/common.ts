import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  forceReset: true,
};

const commonSlice = createSlice({
  name: "filtersReducer",
  initialState,
  reducers: {
    setForceReset: (state, action: PayloadAction<boolean>) => {
      state.forceReset = action.payload;
    },
  },
});

export const { setForceReset } = commonSlice.actions;
export default commonSlice.reducer;
