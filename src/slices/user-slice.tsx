import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import TUser from "../types/models/TUser";
import TUserAuth from "../types/models/TUserAuth";
import jwtDecode, { JwtPayload } from "jwt-decode";

let initialState: UserState = {
  isLoggedIn: false,
};

const storedState = localStorage.getItem("initialState");
if (storedState !== null) {
  const data: TUserAuth = JSON.parse(storedState);
  const payload = jwtDecode<JwtPayload>(data.token);
  const exp = payload.exp;
  if (exp && Date.now() < exp * 1000) {
    initialState = {
      isLoggedIn: true,
      user: data,
    };
  }
}

type UserState = {
  isLoggedIn: boolean;
  user?: TUserAuth;
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<TUserAuth>) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    logoutUser: (state) => {
      state.isLoggedIn = false;
      state.user = undefined;
    },
  },
});

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
