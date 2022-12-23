import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
  Divider,
} from "@mui/material";
import ProfileImage from "./profile-image";

const UserCard = () => {
  return(<Box sx={{maxWidth: "300px"}}>
    <ProfileImage backgroundImage="https://images.unsplash.com/photo-1608848461950-0fe51dfc41cb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTl8fHxlbnwwfHx8fA%3D%3D&w=1000&q=80" />
    <Box>
      <Typography>@ionel</Typography>
      <Typography sx={{mb: 1}} variant="h5">Ionel Marcel</Typography>
      <Typography>Builder of software with a passion for learning. I specialize in web development and user experience design.</Typography>
    </Box>
    <Divider sx={{mt: 2, mb: 2}} />
    <Button variant="contained">Email</Button>
  </Box>)
};

export default UserCard;
