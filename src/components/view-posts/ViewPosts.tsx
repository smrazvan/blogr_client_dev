import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  CircularProgress,
  Divider,
  Fab,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import TFeedPost from "../../types/models/TFeedPost";
import AddIcon from "@mui/icons-material/Add";
import ToggleInterest from "../toggle-interests/toggle-interests";
import BlogCard from "../blog-card/blog-card.component";
import { useEffect, useState } from "react";
import {
  createSearchParams,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import { useGetPostsQuery } from "../../features/api/postsApiSlice";
import { errorHandler } from "../../helpers/error-handler";
import { useAppSelector } from "../../features/hooks";

type ViewPosts = {
  username?: string | undefined;
  isBookmarked?: boolean | undefined;
};

const ViewPosts = (props: ViewPosts) => {
  const { username, isBookmarked } = props;
  //get default query strings
  const [searchParams, setSearchParams] = useSearchParams();
  const defaultInterests = searchParams.getAll("interests");
  const defaultSorting = searchParams.get("sort");
  const defaultPage = searchParams.get("page");
  const defaultSearch = searchParams.get("input");

  const [interests, setInterests] = useState(
    defaultInterests.length ? defaultInterests : []
  );
  const [sorting, setSorting] = useState<string>(
    defaultSorting ? defaultSorting : "rec"
  );
  const [page, setPage] = useState<number>(
    Number(defaultPage ? defaultPage : 1)
  );
  const { state: search } = useLocation();
  let searchValue = search || defaultSearch;
  //get search queries and make request
  const { data, error, isLoading, refetch } = useGetPostsQuery({
    interests: interests,
    sorting: sorting,
    page: page,
    username: username,
    input: searchValue,
    isBookmarked: isBookmarked ? true : false,
  });
  const hasPosts = data ? (data.result.length > 0 ? true : false) : false;
  const handleSortingChange = (event: SelectChangeEvent) => {
    setSorting(event.target.value as string);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  useEffect(() => {
    //change url queries when filtering changes
    const params: {
      interests?: string[];
      sorting?: string;
      page?: string;
      input?: string;
    } = {
      interests: interests,
      sorting: sorting,
      page: String(page),
    };
    if (search) {
      params.input = searchValue;
    }
    setSearchParams(createSearchParams(params), { replace: true });
  }, [interests, sorting, page]);

  if (isLoading) return <CircularProgress />;

  if (error) {
    errorHandler(error);
    return <p>Could not load content.</p>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        flexWrap: "wrap",
        gap: 1,
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {hasPosts && (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: 5,
          }}
        >
          <ToggleInterest interests={interests} setInterests={setInterests} />
          <Box>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={sorting}
              onChange={handleSortingChange}
            >
              <MenuItem value={"rec"}>Recommended</MenuItem>
              <MenuItem value={"pop"}>Popularity</MenuItem>
              <MenuItem value={"asc"}>Newest</MenuItem>
            </Select>
          </Box>
        </Box>
      )}
      {!hasPosts && <Typography>Nothing to see here.</Typography>}
      {data?.result?.map((feedPost: TFeedPost, idx) => {
        console.log(feedPost);
        return (
          <>
            <BlogCard key={idx} post={feedPost} />
            <Divider sx={{ width: "100%", mb: 2 }} />
          </>
        );
      })}
      {hasPosts && (
        <Pagination
          page={page}
          onChange={handlePageChange}
          count={data?.totalPages}
        />
      )}
    </Box>
  );
};

export default ViewPosts;
