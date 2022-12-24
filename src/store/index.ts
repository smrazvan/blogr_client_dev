import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { postsApi } from "../features/api/postsApiSlice";
import userSlice from "../slices/user-slice";
import { usersApi } from "../features/api/usersApiSlice";

export const store = configureStore({
  reducer: {
    [postsApi.reducerPath] : postsApi.reducer,
    [usersApi.reducerPath] : usersApi.reducer,
    user: userSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postsApi.middleware, usersApi.middleware),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
setupListeners(store.dispatch);