import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: true,
  user: {
    username: "string",
    firstName: "string",
    lastName: "string",
    bio: "string",
    profileImageUrl: null,
    backgroundImageUrl: null,
    birthDate: "2022-12-13T16:50:59.194+00:00",
    id: 1,
  },
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
});

export default userSlice.reducer;