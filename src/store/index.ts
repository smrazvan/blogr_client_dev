import { Middleware, MiddlewareAPI, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { postsApi } from "../features/api/postsApiSlice";
import userSlice, { checkTokenIfValid, logoutUser } from "../slices/user-slice";
import { usersApi } from "../features/api/usersApiSlice";
import { authApi } from "../features/api/authApiSlice";
import { interestsApi } from "../features/api/interestsApiSlice";
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
    [postsApi.reducerPath]: postsApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [interestsApi.reducerPath]: interestsApi.reducer,
    user: userSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      checkTokenMiddleware,
      postsApi.middleware,
      usersApi.middleware,
      authApi.middleware,
      interestsApi.middleware,
      rtkQueryErrorLogger
    ),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
setupListeners(store.dispatch);
