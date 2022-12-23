import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Stack,
  Chip,
  Avatar,
  CardActions,
  Button,
  Box,
  Checkbox,
} from "@mui/material";
import TInterest from "../../types/models/TInterest";
import { useNavigate } from "react-router-dom";
import PostFeedImg from "./imageContainer";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";

type BlogCard = {
  id: number;
  title: string;
  username: string;
  imageCaptionUrl: string;
  interests: TInterest[];
  caption: string;
  children?: React.ReactNode;
};
const BlogCard = (props: BlogCard) => {
  const navigate = useNavigate();
  const { id, title, username, imageCaptionUrl, interests, caption } = props;
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "600px",
        height: "250px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
          flexWrap: "wrap",
          wordBreak: "break-all",
          width: "60%",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Chip
            avatar={
              <Avatar
                alt={username}
                src="https://analystprep.com/cfa-level-1-exam/wp-content/uploads/2016/09/person-flat.png"
              />
            }
            label={username}
            variant="outlined"
          />
          <Typography>23 Nov</Typography>
        </Box>
        <Box>
          <Typography gutterBottom variant="h5" component="div">
            {title.substring(0, 100)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {caption.substring(0, 200)}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems:"center" }}>
          <Box>
            {interests.map((interest: TInterest) => {
              return (
                <Chip
                  label={interest.name}
                  color="primary"
                  variant="outlined"
                />
              );
            })}
          </Box>
          <Box>
            <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
            <Checkbox
              icon={<BookmarkBorderIcon />}
              checkedIcon={<BookmarkIcon />}
            />
          </Box>
        </Box>
      </Box>
      <Box sx={{ width: "30%" }}>
        <PostFeedImg backgroundImage={imageCaptionUrl} />
      </Box>
    </Box>
    // <Card sx={{ width: "100%", maxWidth: "800px", wordBreak: "break-all" }}>
    //     <CardMedia
    //       sx={{maxHeight: "200px"}}
    //       component="img"
    //       image={imageCaptionUrl}
    //       alt={caption}
    //     />
    //     <CardContent>
    //       <div>
    //         <Typography gutterBottom variant="h5" component="div">
    //           {title}
    //         </Typography>
    //         <Stack direction="row" spacing={1}>
    //           <Chip
    //             avatar={<Avatar alt={username} src="https://analystprep.com/cfa-level-1-exam/wp-content/uploads/2016/09/person-flat.png" />}
    //             label={username}
    //             variant="outlined"
    //           />
    //           {interests.map((interest: TInterest) => {
    //             return <Chip label={interest.name} color="primary" variant="outlined" />
    //           })}
    //         </Stack>
    //         <Typography variant="body2" color="text.secondary">
    //           {caption}
    //         </Typography>
    //       </div>
    //     </CardContent>
    //     <CardActions>
    //       <Button size="small">Like</Button>
    //       <Button size="small" onClick={() => navigate(`/post/${id}`)}>Read</Button>
    //       <Button size="small">Read later</Button>
    //       <Button size="small">Share</Button>
    //     </CardActions>
    //   </Card>
  );
};
export default BlogCard;
