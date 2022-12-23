import { FavoriteBorder, Favorite } from "@mui/icons-material";
import { Box, Checkbox } from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";

const PostInteractions = () => {
  return (
    <Box>
      <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
      <Checkbox icon={<BookmarkBorderIcon />} checkedIcon={<BookmarkIcon />} />
    </Box>
  );
};

export default PostInteractions;
