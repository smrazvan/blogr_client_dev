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
import TUser from "../../types/models/TUser";
import AvatarChip from "../avatar-chip/avatar-chip";

type UserCard = {
  user: Partial<TUser> | undefined;
};

const UserCard = (props: UserCard) => {
  if (!props.user) return <></>;
  const { username, firstName, lastName, bio, birthdate } = props.user;
  return (
    <Box sx={{ maxWidth: "300px" }}>
      <ProfileImage backgroundImage="https://images.unsplash.com/photo-1608848461950-0fe51dfc41cb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTl8fHxlbnwwfHx8fA%3D%3D&w=1000&q=80" />
      <Box>
        <AvatarChip user={props.user} />
        <Typography sx={{ mb: 1 }} variant="h5">
          {`${firstName} ${lastName}`}
        </Typography>
        <Typography>{bio}</Typography>
      </Box>
      <Divider sx={{ mt: 2, mb: 2 }} />
      <Button variant="contained">Email</Button>
    </Box>
  );
};

export default UserCard;
