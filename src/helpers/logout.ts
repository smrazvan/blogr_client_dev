import { store } from "../store"
import { logoutUser } from "../slices/user-slice"
export const logout = () => {
  localStorage.clear();
  store.dispatch(logoutUser());
}