import TUser from "./TUser";

interface TComment {
  id: number;
  content: string;
  user: TUser;
}

export default TComment;