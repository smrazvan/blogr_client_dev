import { Avatar, Box, Button, Card, CardActions, CardContent, CardMedia, Chip, Stack, Typography } from "@mui/material";
import BlogCard from "../../components/blog-card/blog-card.component";
import { useGetPostsQuery } from "../../features/api/bloggr-api";


export const Home = () => {
  const tags:string[] = ["C#"];
  const {data, error, isLoading } = useGetPostsQuery();
  if(isLoading) return <h1>XAXA</h1>;

  if(error) return <h1>ERROR</h1>
  console.log(data);
  return (
    <>
    <Box sx={{display: "flex", flexWrap: "wrap", gap: 4, justifyContent: "center"}}>
      {data?.map(({title, content}) => {
        return <BlogCard tags={tags} name="Ionel Marcel" title={title} img="https://code.visualstudio.com/assets/docs/languages/csharp/c_sharp_hero.png" shortDescription={content} />
      })
      }
    </Box>
    </>
  );
}