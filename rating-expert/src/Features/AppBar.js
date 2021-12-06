import {
  Typography,
  Toolbar,
  AppBar,
  Box,
  MenuItem,
  Menu,
  IconButton,
} from "@mui/material";

import AccountCircle from "@mui/icons-material/AccountCircle";
import Visibility from "@mui/icons-material/Visibility";

import { useState } from "react";
import { useSelector } from "react-redux";
import LoginModal from "./loginModal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ButtonAppBar({ children }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const loggedIn = useSelector((state) => state.user.loggedIn);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const isMenuOpen = Boolean(anchorEl);

  const menuId = "primary-search-account-menu";

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleProfileMenuClose}
    >
      {!loggedIn && <MenuItem onClick={handleOpen}>Login</MenuItem>}
      {loggedIn && (
        <MenuItem onClick={handleProfileMenuClose}>Profile</MenuItem>
      )}
      {loggedIn && (
        <MenuItem onClick={handleProfileMenuClose}>My account</MenuItem>
      )}
      {loggedIn && <MenuItem onClick={handleProfileMenuClose}>Logout</MenuItem>}
    </Menu>
  );

  return (
    <div>
      <LoginModal handleClose={handleClose} open={open} />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Rating Expert
            </Typography>

            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Toolbar>
        </AppBar>
        {renderMenu}
      </Box>
      <Box m={5}>{children}</Box>
    </div>
  );
}
