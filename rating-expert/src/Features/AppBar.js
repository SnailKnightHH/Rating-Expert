import {
  Toolbar,
  AppBar,
  Box,
  MenuItem,
  Menu,
  IconButton,
  Button,
  Grid,
  Snackbar,
  Alert,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";

import { useState } from "react";
import { useSelector } from "react-redux";
import LoginModal from "./loginModal";
import { useAuth } from "./userAuth";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { signOutUser } from "../Pages/userSlice";
import { useDispatch } from "react-redux";

export default function ButtonAppBar({ children }) {
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackBarSeverity, setSnackBarSeverity] = useState("error"); // default to nothing will be complained
  const [snackBarMessage, setSnackBarMessage] = useState("");

  const handleSnackBarClose = () => {
    setOpenSnackBar(false);
  };

  const SnackBarAlert = () => {
    return (
      // somehow only use snackbar (without alert) overrides severity and message
      <Snackbar
        autoHideDuration={5000}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={openSnackBar}
        onClose={handleSnackBarClose}
        key={"bottom_center"}
      >
        <Alert onClose={handleSnackBarClose} severity={snackBarSeverity}>
          {snackBarMessage}
        </Alert>
      </Snackbar>
    );
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const loggedIn = useSelector((state) => state.user.loggedIn);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const auth = useAuth();
  const dispatch = useDispatch();

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
      if (resp.data === "Logout successfully") {
        dispatch(signOutUser());
        setSnackBarSeverity("success");
        setSnackBarMessage("Sign out successful");
        setOpenSnackBar(true);
      } else {
        setSnackBarSeverity("error");
        setSnackBarMessage("Sign out failed");
        setOpenSnackBar(true);
      }
    } catch (err) {
      console.log(err);
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
      <SnackBarAlert />
      <LoginModal handleClose={handleClose} open={open} />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Grid
              container
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item>
                <Button component={Link} to={"/main"} sx={{ color: "white" }}>
                  Rating Expert
                </Button>
              </Grid>
              <Grid item>
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
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        {renderMenu}
      </Box>
      <Box m={5}>{children}</Box>
    </div>
  );
}
