import { Chip, Avatar } from "@mui/material";
import TUser from "../../types/models/TUser";
import { useNavigate } from "react-router-dom";

type AvatarChip = {
  user: Partial<TUser> | undefined;
};

const AvatarChip = (props: AvatarChip) => {
  const navigate = useNavigate();
  const { username } = props.user ? props.user : { username: "deleted" };

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    navigate(`/${username}`);
  };
  return (
    <Chip
      onClick={(e) => handleClick(e)}
      avatar={<Avatar alt={username} />}
      label={username}
      variant="outlined"
    />
  );
};

export default AvatarChip;
