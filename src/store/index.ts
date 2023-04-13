import { configureStore } from "@reduxjs/toolkit";
import reducers from "@/store/reducers";

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
