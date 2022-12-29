import { store } from "../store";
import { setUser } from "../slices/user-slice";
import TUserAuth from "../types/models/TUserAuth";


const SetCredentials = (user : TUserAuth) => {
  store.dispatch(setUser(user));
  localStorage.setItem("initialState", JSON.stringify(user));
}

export default SetCredentials;