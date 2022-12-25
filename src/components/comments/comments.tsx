import { Box, Pagination, Paper, Typography } from "@mui/material";
import { useGetPostCommentsQuery } from "../../features/api/postsApiSlice";
import TComment from "../../types/models/TComment";
import TPost from "../../types/models/TPost";
import ProfileImage from "../user-card/profile-image";
import AvatarChip from "../avatar-chip/avatar-chip";
import { useState } from "react";

type Comments = {
  post: TPost | undefined;
};

const Comments = (props: Comments) => {
  const { id, user } = props.post
    ? props.post
    : { id: 0, user: { username: "deleted" } };
  const [page, setPage] = useState<number>(1);

  const { data, isLoading, error } = useGetPostCommentsQuery({
    postId: id,
    page: page,
  });

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };
  if (error) return <h1>Error</h1>;

  return (
    <>
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
