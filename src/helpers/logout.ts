import { store } from "../store";
import { logoutUser } from "../slices/user-slice";
import { enqueueSnackbar } from "notistack";
export const logout = () => {
  store.dispatch(logoutUser());
  enqueueSnackbar("Logged out!", { variant: "info" });
};
