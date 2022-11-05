import { Outlet } from "react-router-dom";
import { AppBar, Typography } from "@mui/material";

export const Navbar = () => {
  return (<>
    <AppBar>
      <Typography>Bloggr</Typography>
    </AppBar>
    <Outlet />
  </>)
}