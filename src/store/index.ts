import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { bloggrApi } from "../features/api/bloggr-api";

export const store = configureStore({
  reducer: {
    [bloggrApi.reducerPath] : bloggrApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(bloggrApi.middleware),
});

setupListeners(store.dispatch);