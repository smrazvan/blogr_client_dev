import { Link, useNavigate } from "react-router-dom";
import { Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const mainItems = [
  {
    name: "Feed",
    route: "/",
    icon: <AccountCircleIcon />
  },{
    name: "My blog",
    route: "/ionel",
    icon: <AccountCircleIcon />
  },{
    name: "Settings",
    route: "/settings",
    icon: <AccountCircleIcon />
  }
];
const exploreItems = [
  {
    name: "Programming",
    route: "/",
    icon: <AccountCircleIcon />
  },{
    name: "Gaming",
    route: "/",
    icon: <AccountCircleIcon />
  },{
    name: "Psychology",
    route: "/",
    icon: <AccountCircleIcon />
  },{
    name: "Cooking",
    route: "/",
    icon: <AccountCircleIcon />
  }
]
const otherItems = [
  {
    name: "Help",
    route: "/help",
    icon: <AccountCircleIcon />
  },{
    name: "Send feedback",
    route: "/feedback",
    icon: <AccountCircleIcon />
  },{
    name: "About",
    route: "/About",
    icon: <AccountCircleIcon />
  }
]

export const DrawerContent = () => {
  const navigate = useNavigate();
  return <div>
    <Toolbar />
    <List>
      {mainItems.map(({name, route, icon}, idx) => (
        <ListItem key={idx} onClick={() => navigate(route)} disablePadding>
          <ListItemButton>
            <ListItemIcon>
            {icon}
            </ListItemIcon>
            <ListItemText primary={name} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
    <Divider />
    <ListItem disablePadding>
      <ListItemButton>
        <ListItemText>Explore</ListItemText>
      </ListItemButton>
    </ListItem>
    <List>
    {exploreItems.map(({name, route, icon}, idx) => (
        <ListItem key={idx} onClick={() => navigate(route)} disablePadding>
          <ListItemButton>
            <ListItemIcon>
            {icon}
            </ListItemIcon>
            <ListItemText primary={name} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
    <Divider />
    <List>
    {otherItems.map(({name, route, icon}, idx) => (
        <ListItem key={idx} onClick={() => navigate(route)} disablePadding>
          <ListItemButton>
            <ListItemIcon>
            {icon}
            </ListItemIcon>
            <ListItemText primary={name} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  </div>
};