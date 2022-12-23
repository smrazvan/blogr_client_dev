import TFeedPost from "./TFeedPost";

interface TPostsPage {
  totalCount: number;
  totalPages: number;
  pageSize: number;
  pageNumber: number;
  result: TFeedPost[];
}

export default TPostsPage;