import { RawDraftContentState } from "draft-js";
import TInterest from "./TInterest";
import TUser from "./TUser";

interface TPost {
  id: number;
  userId: number;
  title: string;
  content: string;
  caption: string;
  creationDate: string;
  user: TUser;
  interests: TInterest[];
}

export default TPost;