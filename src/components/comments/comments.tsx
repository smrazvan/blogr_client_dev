import {
  Box,
  InputLabel,
  MenuItem,
  Pagination,
  Paper,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { useGetPostCommentsQuery } from "../../features/api/postsApiSlice";
import TComment from "../../types/models/TComment";
import TPost from "../../types/models/TPost";
import ProfileImage from "../user-card/profile-image";
import AvatarChip from "../avatar-chip/avatar-chip";
import { useEffect, useState } from "react";
import { createSearchParams, useSearchParams } from "react-router-dom";

type Comments = {
  post: TPost | undefined;
};

const Comments = (props: Comments) => {
  const { id, user } = props.post
    ? props.post
    : { id: 0, user: { username: "deleted" } };
  const [searchParams, setSearchParams] = useSearchParams();
  const defaultSorting = searchParams.get("sort");
  const defaultPage = searchParams.get("page");

  const [page, setPage] = useState<number>(
    Number(defaultPage ? defaultPage : 1)
  );
  const [sorting, setSorting] = useState<string>(
    defaultSorting ? defaultSorting : "new"
  );
  const { data, isLoading, error } = useGetPostCommentsQuery({
    postId: id,
    page: page,
    sorting: sorting,
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
        sorting: sorting,
        page: String(page),
      })
    );
  }, [sorting, page]);
  if (error) return <h1>Error</h1>;

  return (
    <>
      <Box>
        <InputLabel id="demo-simple-select-label">View by</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={sorting}
          onChange={handleSortingChange}
        >
          <MenuItem value={"new"}>Newest</MenuItem>
          <MenuItem value={"old"}>Oldest</MenuItem>
        </Select>
      </Box>
      {data?.result.map((comment: TComment) => {
        return (
          <Paper>
            <Box sx={{ mt: 1, mb: 1, p: 2 }}>
              <AvatarChip user={comment.user} />
              <Typography>{comment.content}</Typography>
            </Box>
          </Paper>
        );
      })}
      <Pagination
        page={page}
        onChange={handlePageChange}
        count={data?.totalPages}
      />
    </>
  );
};

export default Comments;
