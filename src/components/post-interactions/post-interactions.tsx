import React from "react";
import { FavoriteBorder, Favorite } from "@mui/icons-material";
import { Box, Checkbox } from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { useState } from "react";
import {
  useAddPostCommentMutation,
  useAddPostLikeMutation,
  useRemovePostLikeMutation,
} from "../../features/api/postsApiSlice";
import { enqueueSnackbar } from "notistack";
import { errorHandler } from "../../helpers/error-handler";

type PostInteractions = {
  postId?: number;
  isLikedByUser?: boolean;
};

const PostInteractions = ({ postId, isLikedByUser }: PostInteractions) => {
  const [checked, setChecked] = useState(isLikedByUser ? isLikedByUser : false);
  const [like, likeData] = useAddPostLikeMutation();
  const [unlike, unlikeData] = useRemovePostLikeMutation();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (postId)
      if (checked) {
        unlike(postId)
          .unwrap()
          .then(() => {
            enqueueSnackbar("Unliked post", { variant: "info" });
          })
          .catch((err) => errorHandler(err));
      } else {
        like(postId)
          .unwrap()
          .then(() => {
            enqueueSnackbar("Liked post", { variant: "info" });
          })
          .catch((err) => errorHandler(err));
      }
    setChecked(event.target.checked);
  };
  return (
    <Box>
      <Checkbox
        checked={checked}
        onChange={handleChange}
        icon={<FavoriteBorder />}
        checkedIcon={<Favorite />}
      />
      <Checkbox icon={<BookmarkBorderIcon />} checkedIcon={<BookmarkIcon />} />
    </Box>
  );
};

export default PostInteractions;
