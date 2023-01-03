import { store } from "../store";
import { setUser, setUserAuth } from "../slices/user-slice";
import TUserAuth from "../types/models/TUserAuth";


const SetCredentials = (userData : TUserAuth) => {
  store.dispatch(setUserAuth(userData));
  localStorage.setItem("initialState", JSON.stringify(userData));
}

export default SetCredentials;