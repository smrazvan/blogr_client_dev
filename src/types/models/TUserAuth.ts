import TUser from "./TUser";

interface TUserAuth extends TUser {
  token: string;
}

export default TUserAuth;