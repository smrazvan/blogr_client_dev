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
import TFeedPost from "../../types/models/TFeedPost";
import AddIcon from "@mui/icons-material/Add";
import ToggleInterest from "../toggle-interests/toggle-interests";
import TPostsPage from "../../types/models/TPostsPage";
import BlogCard from "../blog-card/blog-card.component";

type ViewPosts = {
  data: TPostsPage | undefined;
};

const ViewPosts = (props: ViewPosts) => {
  const { data } = props;
  const handlePostClick = (id: number) => {};
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 1,
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <ToggleInterest />
        <Box>
          <InputLabel id="demo-simple-select-label">View by</InputLabel>
          <Select labelId="demo-simple-select-label" id="demo-simple-select">
            <MenuItem value={10}>Popularity</MenuItem>
            <MenuItem value={20}>Newest</MenuItem>
            <MenuItem value={30}>Recommended</MenuItem>
          </Select>
        </Box>
      </Box>

      {data?.result?.map(
        ({ id, title, caption, user, interests }: TFeedPost) => {
          return (
            <>
              <BlogCard
                key={id}
                id={id}
                interests={interests}
                username={user ? user.username : "deleted"}
                title={title}
                imageCaptionUrl="https://code.visualstudio.com/assets/docs/languages/csharp/c_sharp_hero.png"
                caption={caption}
              />
              <Divider sx={{ width: "100%", mb: 2 }} />
            </>
          );
        }
      )}
    </Box>
  );
};

export default ViewPosts;
