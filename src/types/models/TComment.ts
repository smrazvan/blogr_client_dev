import TUser from "./TUser";

interface TComment {
  id: number;
  content: string;
  user: TUser;
  userId: number;
}

export default TComment;