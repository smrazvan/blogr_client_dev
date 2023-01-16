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
  if (!props.user) return <>Could not find user</>;
  const { firstName, lastName, bio, birthDate, profileImageUrl } = props.user;
  return (
    <Box sx={{ wordBreak: "break-all", maxWidth: "300px" }}>
      <ProfileImage backgroundImage={profileImageUrl!} />
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
