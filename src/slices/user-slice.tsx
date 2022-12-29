import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import TUser from "../types/models/TUser";
import TUserAuth from "../types/models/TUserAuth";

const initialState: UserState = {
  isLoggedIn: false,
};

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
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
