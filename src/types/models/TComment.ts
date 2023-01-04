import TUser from "./TUser";

interface TComment {
  id: number;
  content: string;
  user: TUser;
  userId: number;
  postId: number;
}

export default TComment;
