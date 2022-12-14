import { Link, useNavigate } from "react-router-dom";
import {
  styled,
  Button,
  ButtonProps,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { green } from "@mui/material/colors";
import AddIcon from "@mui/icons-material/Add";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import CoPresentOutlinedIcon from "@mui/icons-material/CoPresentOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import QuizOutlinedIcon from "@mui/icons-material/QuizOutlined";
import AddCommentOutlinedIcon from "@mui/icons-material/AddCommentOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useAppSelector } from "../../features/hooks";
import BookmarksOutlinedIcon from "@mui/icons-material/BookmarksOutlined";
import ProtectedComponent from "../protected-component/protected-component";

const otherItems = [
  {
    name: "Send feedback",
    route: "/feedback",
    icon: <AddCommentOutlinedIcon />,
  },
  {
    name: "About",
    route: "/About",
    icon: <InfoOutlinedIcon />,
  },
];
const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  backgroundColor: green[500],
  "&:hover": {
    backgroundColor: green[700],
  },
}));

export const DrawerContent = () => {
  const userData = useAppSelector((state) => state.user);

  const mainItems = [
    {
      name: "Feed",
      route: "/",
      icon: <AutoStoriesOutlinedIcon />,
    },
    {
      name: "My blog",
      route: userData.isLoggedIn ? `/${userData.user?.userName}` : "/login",
      icon: <CoPresentOutlinedIcon />,
    },
    {
      name: "Bookmarks",
      route: "/bookmarks",
      icon: <BookmarksOutlinedIcon />,
    },
  ];
  const navigate = useNavigate();
  return (
    <div>
      <Toolbar />
      <List>
        <ListItem>
          <ColorButton
            onClick={() => navigate("/post")}
            variant="contained"
            startIcon={<AddIcon />}
          >
            <Typography color="white">New post</Typography>
          </ColorButton>
        </ListItem>
        <ListItem onClick={() => navigate("/")} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <AutoStoriesOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={"Feed"} />
          </ListItemButton>
        </ListItem>
        <ProtectedComponent>
          <ListItem
            onClick={() =>
              navigate(
                userData.isLoggedIn ? `/${userData.user?.userName}` : "/login"
              )
            }
            disablePadding
          >
            <ListItemButton>
              <ListItemIcon>
                <CoPresentOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary={"My Blog"} />
            </ListItemButton>
          </ListItem>
        </ProtectedComponent>
        <ProtectedComponent>
          <ListItem onClick={() => navigate("/bookmarks")} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <BookmarksOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary={"Bookmarks"} />
            </ListItemButton>
          </ListItem>
        </ProtectedComponent>
        {/* {mainItems.map(({ name, route, icon }, idx) => (
          <ListItem key={idx} onClick={() => navigate(route)} disablePadding>
            <ListItemButton>
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={name} />
            </ListItemButton>
          </ListItem>
        ))} */}
      </List>
      <Divider />
      <List>
        {otherItems.map(({ name, route, icon }, idx) => (
          <ListItem key={idx} onClick={() => navigate(route)} disablePadding>
            <ListItemButton>
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
};
