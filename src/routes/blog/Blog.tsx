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
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { useGetPostsQuery } from "../../features/api/bloggrApiSlice";
import ViewPosts from "../../components/view-posts/ViewPosts";
import UserCard from "../../components/user-card/user-card";
import { useParams } from "react-router-dom";
import { useGetUserQuery } from "../../features/api/bloggrApiSlice";
import { useState } from "react";

const Blog = () => {
  const { username = "" } = useParams();
  // let [skip, setSkip] = useState(true);
  const { data, isLoading, error } = useGetUserQuery(username);

  if (isLoading) return <CircularProgress />;

  if (error) return <h1>User doesn't exist</h1>;

  if (!data) return <h1>User doesn't exist</h1>;

  return (
    <>
      <Box>
        <Typography variant="h4" sx={{ m: 4 }}>
          {`${data?.firstName} ${data?.lastName}`}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: 4,
          justifyContent: "center",
          position: "relative",
        }}
      >
        <Box sx={{ flexBasis: "66%" }}>
          <ViewPosts username={username} />
        </Box>
        <Divider orientation="vertical" flexItem />
        <Box sx={{ flexBasis: "30%" }}>
          <UserCard user={data} />
        </Box>
      </Box>
    </>
  );
};

export default Blog;
