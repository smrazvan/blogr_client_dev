import { Box, Chip, Divider, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../features/hooks";
export type Message = {
  userName: string;
  message: string;
};
export const Message = ({ userName, message }: Message) => {
  const navigate = useNavigate();
  const userData = useAppSelector((state) => state.user);
  const loggedUserName = userData.user?.userName;
  return (
    <Box
      sx={{
        mt: 0.5,
        mb: 0.5,
        p: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: userName == loggedUserName ? "flex-end" : "flex-start",
      }}
    >
      <Box>
        <Chip
          label={userName}
          variant="outlined"
          onClick={() => navigate(`/${userName}`)}
        />
      </Box>
      <Typography sx={{ wordBreak: "break-all", margin: "4px 0 0 4px" }}>
        {message}
      </Typography>
      <Divider sx={{ width: "100%" }} />
    </Box>
  );
};
