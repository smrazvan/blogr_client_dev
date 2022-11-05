import { useState } from "react";
import { Outlet } from "react-router-dom";

import { styled, alpha, AppBar, Box, IconButton, Toolbar, Typography, InputBase, Drawer, useMediaQuery, useTheme, Menu, MenuItem, Divider, Button, ButtonProps } from "@mui/material";

import Logo from "../../assets/img/min-logo.png";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';

import { DrawerContent } from "../drawer/drawer.component";

import { green } from '@mui/material/colors';
//custom components for search bar
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));
const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));
const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText(green[500]),
  backgroundColor: green[500],
  '&:hover': {
    backgroundColor: green[700],
  },
}));
const drawerWidth:number = 240;
export const Navbar = () => {
  //store if user is on mobile/desktop
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  //toggle drawer on < sm
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  }
  //handle account button menu
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (<>
    <Box sx={{ display: 'flex' }}>
      {/* NAVBAR */}
      <AppBar component="nav" position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton color="inherit" onClick={handleDrawerToggle} sx={{display: {xs: "block", sm: "none"}}}>
            <MenuIcon />
          </IconButton>
          <IconButton sx={{display: {xs: "none", sm: "block"}}}>
            <img style={{maxWidth: "50px"}} src={Logo} alt="logo" />
          </IconButton>
          <Search>
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Typography sx={{display: {xs: "none", sm: "block"}}}>
            Welcome back, Marcel!
          </Typography>
          <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircleIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Go to my profile</MenuItem>
                <MenuItem onClick={handleClose}>Edit profile</MenuItem>
                <MenuItem onClick={handleClose}>Likes</MenuItem>
                <MenuItem onClick={handleClose}>Followers</MenuItem>
                <MenuItem onClick={handleClose}>Following</MenuItem>
                <Divider />
                <MenuItem onClick={handleClose}>Log out</MenuItem>
              </Menu>
            </div>
            <ColorButton variant="contained" startIcon={<AddIcon />}>
              New post
            </ColorButton>
        </Toolbar>
      </AppBar>


      {/* SIDE DRAWER */}
      <Box 
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* render drawer based on appropiate device mobile/desktop */}
        {!matches && <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          <DrawerContent />
        </Drawer>}
        {matches && <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          <DrawerContent />
        </Drawer>}
      </Box>


      {/* CONTENT */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          <Outlet />
      </Box>
    </Box>
  </>)
}