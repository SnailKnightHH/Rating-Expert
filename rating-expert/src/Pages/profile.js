import {
  Grid,
  TextField,
  Typography,
  Button,
  InputAdornment,
  Box,
  Modal,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { useState, Fragment } from "react";
import axios from "axios";
import { baseURL } from "../Constants/constants";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function Profile() {
  const user = useSelector((state) => state.user.user);
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const months = {
    1: "January",
    2: "February",
    3: "March",
    4: "April",
    5: "M<ay",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "October",
    11: "November",
    12: "December",
  };

  const dateFormat = (date) => {
    const [year, month, day] = date.split("T")[0].split("-");
    return `${months[month]} ${day[0] === "0" ? day[1] : day}, ${year}`;
  };

  const goToInstance = ({ category, name }) => {
    history.push(`/main/${category}/${name}`);
  };

  const changePw = () => {
    setOpen(true);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const toggleShowPW = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleShowConfirmPW = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const resetPassword = async () => {
    if (password !== confirmPassword) {
      setSnackBarSeverity("error");
      setSnackBarMessage("Passwords do not match.");
      setOpenSnackBar(true);
    } else {
      const resp = await axios.put(`${baseURL}/resetPW`, {
        password,
        email: user.email,
      });
      if (resp.data === "Password Successfully Updated") {
        setSnackBarSeverity("success");
        setSnackBarMessage("Password Successfully Updated!");
        setOpenSnackBar(true);
        handleClose();
      } else {
        setSnackBarSeverity("error");
        setSnackBarMessage("Password Update Failed.");
        setOpenSnackBar(true);
      }
    }
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

  return (
    <Fragment>
      <SnackBarAlert />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
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
                Reset Password
              </Typography>
            </Grid>
            <Grid item>
              <TextField
                fullWidth
                required
                label="Password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={toggleShowPW}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                required
                label="Confirm Password"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={toggleShowConfirmPW}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item>
              <Button variant="contained" onClick={resetPassword}>
                Submit
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        style={{ rowGap: "1rem" }}
      >
        <Grid item fullWidth>
          <Typography variant="h1" style={{ fontSize: "4rem" }}>
            Profile
          </Typography>
        </Grid>
        <Grid item>
          <TextField
            variant="standard"
            disabled
            label="Email"
            defaultValue={user.email}
            style={{ width: "20rem" }}
          />
        </Grid>
        <Grid item>
          <TextField
            variant="standard"
            disabled
            label="Password"
            defaultValue=" "
            style={{ width: "20rem" }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Button onClick={changePw}>Change</Button>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item>
          <Typography style={{ marginTop: "2rem" }}>
            Joined at: {dateFormat(user.createdAt)}
          </Typography>
        </Grid>
        <Grid item style={{ marginTop: "1rem" }}>
          <Typography>
            <strong>Posts</strong>
          </Typography>
        </Grid>
        <Grid
          container
          item
          justifyContent="space-evenly"
          style={{ marginTop: "1rem" }}
          component={Button}
          disabled
          style={{ color: "black", textTransform: "initial" }}
        >
          <Grid item xs={3}>
            <Typography>Name</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography>Category</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography>Rating</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography>Date</Typography>
          </Grid>
        </Grid>
        {user.posts.length === 0 && (
          <Typography>You have not posted anything yet.</Typography>
        )}
        {user.posts.length !== 0 &&
          user.posts.map((post) => (
            <Grid
              container
              item
              justifyContent="space-evenly"
              component={Button}
              onClick={() => goToInstance(post)}
            >
              <Grid item xs={3}>
                <Typography style={{ textTransform: "initial" }}>
                  {post.name}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography style={{ textTransform: "initial" }}>
                  {post.category}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography style={{ textTransform: "initial" }}>
                  {post.rating}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography style={{ textTransform: "initial" }}>
                  {dateFormat(post.date)}
                </Typography>
              </Grid>
            </Grid>
          ))}
        <Button
          variant="contained"
          onClick={() => {
            history.goBack();
          }}
          style={{ marginTop: "2rem" }}
        >
          Back
        </Button>
      </Grid>
    </Fragment>
  );
}
