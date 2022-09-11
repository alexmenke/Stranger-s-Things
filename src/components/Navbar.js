import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
// import Button from "@material-ui/core/Button";
// import MenuIcon from '@mui/icons-material/Menu';

const pages = ["Cards", "Carousel", "Table"];

const Navbar = ({ logout, token }) => {

  const [anchorElNav, setAnchorElNav] = useState(null);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  }

  const handleCloseNavMenu = (event) => [
    setAnchorElNav(null)
  ]
  return (
    <div className='header'>
      <div className='navbar'>
        <Box sex={{ flexGrow: 1, marginBottom: 3 }}>
          <AppBar position='static'>
            <Toolbar>
              <Typography
                noWrap
                component='div'
                sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}>

              </Typography>
              <Box sx={{ flexGrow: 1, display: { ex: 'flex', md: 'none' } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: 'block', md: 'none' },
                  }}
                >
                  {pages.map((page) => (
                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </Toolbar>
          </AppBar>
        </Box>
        <Link to='/'>Home</Link>
        <Link to='/posts'>Posts</Link>
        {
          token ? (
            <>
              <Link to='/profile'>Profile</Link>
              <Link to='/' onClick={() => logout()}>Logout</Link>
            </>
          ) : (
            <>
              <Link to='/register'>New Account</Link>
              <Link to='/login'>Sign In</Link>
            </>
          )
        }
      </div>
    </div>
  )
}

export default Navbar;