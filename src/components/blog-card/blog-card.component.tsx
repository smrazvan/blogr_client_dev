import { Card, CardMedia, CardContent, Typography, Stack, Chip, Avatar, CardActions, Button } from "@mui/material"
import TInterest from "../../types/models/TInterest";
import { useNavigate } from "react-router-dom";

type BlogCard = {
  id: number;
  title: string,
  username: string,
  imageCaptionUrl: string,
  interests: TInterest[],
  caption: string,
  children?: React.ReactNode
}
const BlogCard = (props: BlogCard) => {
  const navigate = useNavigate();
  const {id, title, username, imageCaptionUrl, interests, caption} = props;
  return (
    <Card sx={{ maxWidth: 400 }}>
        <CardMedia
          component="img"
          height="140"
          image={imageCaptionUrl}
          alt={caption}
        />
        <CardContent>
          <div>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Stack direction="row" spacing={1}>
              <Chip
                avatar={<Avatar alt={username} src="https://analystprep.com/cfa-level-1-exam/wp-content/uploads/2016/09/person-flat.png" />}
                label={username}
                variant="outlined"
              />
              {interests.map((interest: TInterest) => {
                return <Chip label={interest.name} color="primary" variant="outlined" />
              })}
            </Stack>
            <Typography variant="body2" color="text.secondary">
              {caption}
            </Typography>
          </div>
        </CardContent>
        <CardActions>
          <Button size="small">Like</Button>
          <Button size="small" onClick={() => navigate(`/post/${id}`)}>Read</Button>
          <Button size="small">Read later</Button>
          <Button size="small">Share</Button>
        </CardActions>
      </Card>
  )
}
export default BlogCard;