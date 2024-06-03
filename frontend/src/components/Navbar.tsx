import React, { useState, MouseEvent } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Menu,
  MenuItem,
  Avatar,
} from "@mui/material";
import axios from "utils/axios";
import { Link } from "react-router-dom";

import { useAuth } from "contexts/AuthContext";

const Navbar: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { authenticatedUser, setAuthenticatedUser } = useAuth();

  const handleMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await axios.get('/oauth/logout')
    } catch (error) {
      console.log('Error logging out:', error)
    }
    handleClose();
    setAuthenticatedUser(null);
  };

  return (
    <AppBar position='static'>
      <Toolbar>
        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
          <Button color='inherit' component={Link} to='/'>
            Home
          </Button>
          <Button color='inherit' component={Link} to='/account'>
            Account
          </Button>
          <Button color='inherit' component={Link} to='/activation'>
            Activation
          </Button>
        </Typography>
        <div>
          <IconButton
            edge='end'
            color='inherit'
            aria-label='account of current user'
            aria-controls='menu-appbar'
            aria-haspopup='true'
            onClick={handleMenu}
          >
            <Avatar
              alt={authenticatedUser?.name}
              src={authenticatedUser?.picture || undefined}
            />
          </IconButton>
          <Menu
            id='menu-appbar'
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem disabled>
              <Typography variant='body1'>{authenticatedUser?.name}</Typography>
            </MenuItem>
            <MenuItem disabled>
              <Typography variant='body2'>
                {authenticatedUser?.email}
              </Typography>
            </MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
