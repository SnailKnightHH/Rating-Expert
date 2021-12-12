import {
  Typography,
  Box,
  Button,
  IconButton,
  Modal,
  Backdrop,
  Fade,
  Grid,
  Alert,
  InputAdornment,
  TextField,
  Snackbar,
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { useDispatch } from "react-redux";
import { useState, Fragment } from "react";
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

export default function LoginModal({ open, handleClose }) {
  const [isSignUp, SetIsSignUp] = useState(false);
  const toggleSignUpPage = (event) => {
    event.preventDefault(); // not working?
    SetIsSignUp((prev) => SetIsSignUp(!prev));
    setValid(true);
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
        key={"bottom" + "center"}
      >
        <Alert onClose={handleSnackBarClose} severity={snackBarSeverity}>
          {snackBarMessage}
        </Alert>
      </Snackbar>
    );
  };

  const handleSignIn = async () => {
    try {
      const resp = await auth.signIn(values.email, values.password);
      console.log(resp);
      if (resp.data) {
        dispatch(signInUser(resp.data));
        setSnackBarSeverity("success");
        setSnackBarMessage("Welcome Back rating expert!");
        setOpenSnackBar(true);
        handleClose();
      } else {
        setValid(false);
      }
    } catch (err) {
      setValid(false);
    }
  };

  const handleSignUp = async () => {
    try {
      const resp = await auth.signUp(values.email, values.password);

      if (resp) {
        SetIsSignUp(false);
        setSnackBarSeverity("success");
        setSnackBarMessage("Behold the born of the greatest rating expert!");
        setOpenSnackBar(true);
      }
    } catch (err) {
      if (err.message === "Request failed with status code 409") {
        setSnackBarSeverity("error");
        setSnackBarMessage("This email has been registered already.");
        setOpenSnackBar(true);
      } else {
        setSnackBarSeverity("error");
        setSnackBarMessage("Registration failed.");
        setOpenSnackBar(true);
      }
    }
  };

  return (
    <Fragment>
      <SnackBarAlert />
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
                <Typography variant="h1" align="center" fontSize="3rem">
                  {isSignUp ? "Sign Up" : "Rating Expert"}
                </Typography>
              </Grid>
              {!valid && !isSignUp && (
                <Alert severity="error">
                  The email or password you entered is do not match our record.
                  Please double-check and try again.
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
                    <Button variant="contained" onClick={toggleSignUpPage}>
                      Sign up
                    </Button>
                  )}
                  {isSignUp && (
                    <Button variant="contained" onClick={toggleSignUpPage}>
                      Back
                    </Button>
                  )}
                  {isSignUp && (
                    <Button variant="contained" onClick={handleSignUp}>
                      Welcome!
                    </Button>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Fade>
      </Modal>
    </Fragment>
  );
}
