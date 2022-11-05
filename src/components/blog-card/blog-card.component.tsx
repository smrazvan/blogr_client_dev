import { Card, CardMedia, CardContent, Typography, Stack, Chip, Avatar, CardActions, Button } from "@mui/material"

type BlogCard = {
  title: string,
  name: string,
  img: string,
  tags: string[],
  shortDescription: string,
  children?: React.ReactNode
}
export const BlogCard = (props: BlogCard) => {
  const {title, name, img, tags, shortDescription} = props;
  return (
    <Card sx={{ maxWidth: 400 }}>
        <CardMedia
          component="img"
          height="140"
          image={img}
          alt={shortDescription}
        />
        <CardContent>
          <div>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Stack direction="row" spacing={1}>
              <Chip
                avatar={<Avatar alt={name} src="https://analystprep.com/cfa-level-1-exam/wp-content/uploads/2016/09/person-flat.png" />}
                label={name}
                variant="outlined"
              />
              {tags.map((tag) => {
                return <Chip label={tag} color="primary" variant="outlined" />
              })}
            </Stack>
            <Typography variant="body2" color="text.secondary">
              {shortDescription}
            </Typography>
          </div>
        </CardContent>
        <CardActions>
          <Button size="small">Like</Button>
          <Button size="small">Read</Button>
          <Button size="small">Read later</Button>
          <Button size="small">Share</Button>
        </CardActions>
      </Card>
  )
}