import { Middleware, MiddlewareAPI, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { bloggrApi } from "../features/api/bloggrApiSlice";
import userSlice, { checkTokenIfValid, logoutUser } from "../slices/user-slice";
import { rtkQueryErrorLogger } from "../middleware/error-handling-middleware";

const checkTokenMiddleware: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    if (action) {
      const state = store.getState();
      if (state.user.isLoggedIn && state?.user?.token) {
        if (checkTokenIfValid(state.user.token)) return next(action);
        else {
          console.log("TOKEN EXPIRED");
          store.dispatch(logoutUser());
          return;
        }
      }
    }
    return next(action);
  };

export const store = configureStore({
  reducer: {
    [bloggrApi.reducerPath]: bloggrApi.reducer,
    user: userSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      checkTokenMiddleware,
      bloggrApi.middleware,
      rtkQueryErrorLogger
    ),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
setupListeners(store.dispatch);
