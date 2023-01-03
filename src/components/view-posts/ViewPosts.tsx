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
import { createSearchParams, useSearchParams } from "react-router-dom";
import { useGetPostsQuery } from "../../features/api/postsApiSlice";
import { errorHandler } from "../../helpers/error-handler";

type ViewPosts = {
  username?: string | undefined;
};

const ViewPosts = (props: ViewPosts) => {
  const { username } = props;
  //get default query strings
  const [searchParams, setSearchParams] = useSearchParams();
  const defaultInterests = searchParams.getAll("interests");
  const defaultSorting = searchParams.get("sort");
  const defaultPage = searchParams.get("page");

  const [interests, setInterests] = useState(
    defaultInterests.length ? defaultInterests : []
  );
  const [sorting, setSorting] = useState<string>(
    defaultSorting ? defaultSorting : "recommended"
  );
  const [page, setPage] = useState<number>(
    Number(defaultPage ? defaultPage : 1)
  );

  //get search queries and make request
  const { data, error, isLoading, refetch } = useGetPostsQuery({
    interests: interests,
    sorting: sorting,
    page: page,
    username: username,
  });
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
    setSearchParams(
      createSearchParams({
        interests: interests,
        sorting: sorting,
        page: String(page),
      })
    );
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
        flexWrap: "wrap",
        gap: 1,
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <ToggleInterest interests={interests} setInterests={setInterests} />
        <Box>
          <InputLabel id="demo-simple-select-label">View by</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={sorting}
            onChange={handleSortingChange}
          >
            <MenuItem value={"recommended"}>Recommended</MenuItem>
            <MenuItem value={"popularity"}>Popularity</MenuItem>
            <MenuItem value={"newest"}>Newest</MenuItem>
          </Select>
        </Box>
      </Box>

      {data?.result?.map(
        ({ id, title, caption, user, interests }: TFeedPost) => {
          return (
            <>
              <BlogCard
                key={id}
                id={id}
                interests={interests}
                user={user}
                title={title}
                imageCaptionUrl="https://code.visualstudio.com/assets/docs/languages/csharp/c_sharp_hero.png"
                caption={caption}
              />
              <Divider sx={{ width: "100%", mb: 2 }} />
            </>
          );
        }
      )}
      <Pagination
        page={page}
        onChange={handlePageChange}
        count={data?.totalPages}
      />
    </Box>
  );
};

export default ViewPosts;
