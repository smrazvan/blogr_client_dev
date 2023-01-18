import { store } from "../store";
import { logoutUser } from "../slices/user-slice";
import { enqueueSnackbar } from "notistack";
import { bloggrApi } from "../features/api/bloggrApiSlice";
export const logout = () => {
  store.dispatch(logoutUser());
  window.location.reload();
  enqueueSnackbar("Logged out!", { variant: "info" });
};
