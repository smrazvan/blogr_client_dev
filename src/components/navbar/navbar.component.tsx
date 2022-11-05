import { Outlet } from "react-router-dom";
import { styled, alpha, AppBar, Box, IconButton, Toolbar, Typography, InputBase } from "@mui/material";
import Logo from "../../assets/img/min-logo.png";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

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
export const Navbar = () => {
  return (<>
    <AppBar>
      <Toolbar>
        <IconButton color="inherit">
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
        <IconButton color="inherit">
          <AccountCircleIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
    <Outlet />
  </>)
}