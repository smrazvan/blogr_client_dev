import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Fab,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import BlogCard from "../../components/blog-card/blog-card.component";
import { useGetPostsQuery } from "../../features/api/postsApiSlice";
import TFeedPost from "../../types/models/TFeedPost";
import AddIcon from "@mui/icons-material/Add";
import ToggleInterest from "../../components/toggle-interests/toggle-interests";
import ViewPosts from "../../components/view-posts/ViewPosts";
import { errorHandler } from "../../helpers/error-handler";

export const Home = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          gap: 4,
          justifyContent: "center",
          position: "relative",
        }}
      >
        <ViewPosts />
      </Box>
    </>
  );
};
