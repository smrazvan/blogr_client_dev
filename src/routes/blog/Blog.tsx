import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Divider,
  Fab,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { useGetPostsQuery } from "../../features/api/postsApiSlice";
import ViewPosts from "../../components/view-posts/ViewPosts";
import UserCard from "../../components/user-card/user-card";
import { useParams } from "react-router-dom";
import { useGetUserQuery } from "../../features/api/usersApiSlice";
import { useState } from "react";

const Blog = () => {
  const { username = "" } = useParams();
  // let [skip, setSkip] = useState(true);
  const { data, isLoading, error } = useGetUserQuery("string");
  // if (username == undefined) {
  //   return <h1>No username</h1>;
  // }
  // setSkip(false);
  console.log(data);
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
        <ViewPosts username={username} />
        <Divider orientation="vertical" flexItem />
        <UserCard user={data} />
      </Box>
    </>
  );
};

export default Blog;
