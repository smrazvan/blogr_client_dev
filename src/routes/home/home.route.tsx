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
        <Box sx={{ display: { lg: "block", xs: "none" } }}>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Word of the Day
              </Typography>
              <Typography variant="h5" component="div"></Typography>
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
    </>
  );
};
