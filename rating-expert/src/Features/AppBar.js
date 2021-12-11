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
import { useAuth } from "./userAuth";
import { useHistory } from "react-router";

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

  const auth = useAuth();

  const history = useHistory();
  const goToProfile = () => {
    history.push(`/main/profile`);
  };
  const goToMain = () => {
    history.push(`/main`);
  };

  const handleLogout = async () => {
    try {
      const resp = await auth.signOut();
      // console.log(resp);
      // if (resp.data) {
      //   dispatch(signInUser(resp.data));
      //   setSnackBarSeverity("success");
      //   setSnackBarMessage("Welcome Back rating expert!");
      //   setOpenSnackBar(true);
      //   handleClose();
      // } else {
      //   setValid(false);
      // }
    } catch (err) {
      // setValid(false);
    }
  };

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
      {loggedIn && <MenuItem onClick={goToProfile}>Profile</MenuItem>}
      {loggedIn && <MenuItem onClick={goToMain}>Main</MenuItem>}
      {loggedIn && <MenuItem onClick={handleLogout}>Logout</MenuItem>}
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
