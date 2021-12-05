import {
  Typography,
  Toolbar,
  AppBar,
  Box,
  Button,
  MenuItem,
  Menu,
  IconButton,
  Modal,
  Backdrop,
  Fade,
  Grid,
  Alert,
  InputAdornment,
  TextField,
} from "@mui/material";

import AccountCircle from "@mui/icons-material/AccountCircle";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useAuth } from "./userAuth";
import { signInUser } from "../Pages/userSlice";

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
  const [loggedIn, setloggedIn] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const history = useHistory();

  const isMenuOpen = Boolean(anchorEl);

  const menuId = "primary-search-account-menu";

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Modal logic starts
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [isSignUp, SetIsSignUp] = useState(false);
  const handleSignUp = (event) => {
    event.preventDefault(); // not working?
    SetIsSignUp((prev) => SetIsSignUp(!prev));
  };

  const [values, setValues] = useState({
    email: "",
    password: "",
    showPassword: false,
  });
  const [valid, setValid] = useState(true);
  const dispatch = useDispatch();
  const auth = useAuth();

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSignIn = async () => {
    try {
      const resp = await auth.signIn(values.email, values.password);

      if (resp.data.successSignIn) {
        dispatch(signInUser(resp.data.user));
        history.push("/main");
      } else {
        setValid(false);
      }
    } catch (err) {
      setValid(false);
    }
  };

  // Modal logic stops

  const LoginModal = () => {
    return (
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              rowSpacing={5}
            >
              <Grid item>
                {isSignUp ? (
                  <Typography>Sign Up</Typography>
                ) : (
                  <Typography variant="h1" align="center">
                    Rating Expert
                  </Typography>
                )}
              </Grid>
              {!valid && !isSignUp && (
                <Alert severity="error">
                  The email or password you entered is not correct. Please
                  double-check and try again.
                </Alert>
              )}
              <Grid item>
                <TextField
                  fullWidth
                  required
                  id="outlined-required"
                  label="E-mail Address"
                  placeholder="E-mail Address"
                  onChange={handleChange("email")}
                />

                <TextField
                  fullWidth
                  required
                  label="Password"
                  type={values.showPassword ? "text" : "password"}
                  value={values.password}
                  onChange={handleChange("password")}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {values.showPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <Grid
                  marginTop={3}
                  container
                  display="flex"
                  justifyContent="space-evenly"
                  item
                >
                  {!isSignUp && <Button onClick={handleSignIn}>Sign In</Button>}
                  {!isSignUp && (
                    <Button variant="contained" onClick={handleSignUp}>
                      Sign up
                    </Button>
                  )}
                  {isSignUp && (
                    <Button variant="contained" onClick={handleSignUp}>
                      Back
                    </Button>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Fade>
      </Modal>
    );
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
      {loggedIn && <MenuItem onClick={handleProfileMenuClose}>Logout</MenuItem>}

      {loggedIn && (
        <MenuItem onClick={handleProfileMenuClose}>My account</MenuItem>
      )}
    </Menu>
  );

  return (
    <div>
      <LoginModal />
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
