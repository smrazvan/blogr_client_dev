import { Chip, Avatar } from "@mui/material";
import TUser from "../../types/models/TUser";
import { useNavigate } from "react-router-dom";

type AvatarChip = {
  user: TUser;
};

const AvatarChip = (props: AvatarChip) => {
  const navigate = useNavigate();
  const { profileImageUrl, username } = props.user;

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    navigate("/${username}");
  };
  return (
    <Chip
      onClick={(e) => handleClick(e)}
      avatar={<Avatar alt={username} src={profileImageUrl} />}
      label={username}
      variant="outlined"
    />
  );
};

export default AvatarChip;
