import { Avatar, Box, Button, Card, CardActions, CardContent, CardMedia, Chip, Stack, Typography } from "@mui/material";
import BlogCard from "../../components/blog-card/blog-card.component";
import { useGetPostsQuery } from "../../features/api/postsApiSlice";
import TFeedPost from "../../types/models/TFeedPost";


export const Home = () => {
  const {data, error, isLoading } = useGetPostsQuery();
  if(isLoading) return <h1>Loading</h1>;

  if(error) return <h1>ERROR</h1>
  console.log(data);
  return (
    <>
    <Box sx={{display: "flex", flexWrap: "wrap", gap: 4, justifyContent: "center"}}>
      {data?.map(({id, title, caption, user: {username}, interests } : TFeedPost) => {
        return <BlogCard key={id} id={id} interests={interests} username={username} title={title} imageCaptionUrl="https://code.visualstudio.com/assets/docs/languages/csharp/c_sharp_hero.png" caption={caption} />
      })
      }
    </Box>
    </>
  );
}