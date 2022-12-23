import { Avatar, Box, Button, Card, CardActions, CardContent, CardMedia, Chip, Fab, Stack, Typography } from "@mui/material";
import BlogCard from "../../components/blog-card/blog-card.component";
import { useGetPostsQuery } from "../../features/api/postsApiSlice";
import TFeedPost from "../../types/models/TFeedPost";
import AddIcon from '@mui/icons-material/Add';
import ToggleInterest from "../../components/toggle-interests/ToggleInterests";

export const Home = () => {
  const {data, error, isLoading } = useGetPostsQuery();
  if(isLoading) return <h1>Loading</h1>;

  if(error) return <h1>ERROR</h1>
  console.log(data);
  return (
    <>
    <Box sx={{display: "flex", gap: 4, justifyContent: "center", position: "relative"}}>
      <Box sx={{display: "flex", flexWrap: "wrap", gap: 4, alignItems: "center", flexDirection: "column"}}>
        <ToggleInterest />
        
        {data?.result?.map(({id, title, caption, user, interests } : TFeedPost) => {
          return <BlogCard key={id} id={id} interests={interests} username={user ? user.username : "deleted"} title={title} imageCaptionUrl="https://code.visualstudio.com/assets/docs/languages/csharp/c_sharp_hero.png" caption={caption} />
        })
        }
      </Box>
      <Box>
        <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Word of the Day
          </Typography>
          <Typography variant="h5" component="div">
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            adjective
          </Typography>
          <Typography variant="body2">
            well meaning and kindly.
            <br />
            {'"a benevolent smile"'}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
        </Card>
      </Box>
    </Box>
    <Fab sx={{position: "fixed", bottom: 16, right: 16}} color="primary" aria-label="add">
      <AddIcon />
    </Fab>
    </>
  );
}