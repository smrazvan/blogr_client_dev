import { Avatar, Box, Button, Card, CardActions, CardContent, CardMedia, Chip, Divider, Fab, InputLabel, MenuItem, Select, Stack, Typography } from "@mui/material";
import { useGetPostsQuery } from "../../features/api/postsApiSlice";
import ViewPosts from "../../components/view-posts/ViewPosts";
import UserCard from "../../components/user-card/user-card";

const Blog = () => {
  const {data, error, isLoading } = useGetPostsQuery();
  if(isLoading) return <h1>Loading</h1>;

  if(error) return <h1>ERROR</h1>
  console.log(data);
  return (
    <>
    <Box>
      <Typography variant="h4" sx={{m: 4}}>Ionel Marcel</Typography>
    </Box>
    <Box
      sx={{
        display: "flex",
        gap: 4,
        justifyContent: "center",
        position: "relative",
      }}
    >
      <ViewPosts data={data} />
      <Divider orientation="vertical" flexItem />
      <UserCard />
    </Box>
    </>
  );
}

export default Blog;