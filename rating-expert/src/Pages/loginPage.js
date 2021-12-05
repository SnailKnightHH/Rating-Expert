import {
  Typography,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Card,
  Button,
  CardHeader,
  CardContent,
  CardActions,
  Alert,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/Visibility";
import { useState, Fragment } from "react";
import { useAuth } from "../Features/userAuth";
import { useDispatch } from "react-redux";
import { signInUser } from "./userSlice";
import { useHistory } from "react-router";

export default function LoginPage() {
  const [values, setValues] = useState({
    email: "",
    password: "",
    showPassword: false,
  });
  const [valid, setValid] = useState(true);
  const dispatch = useDispatch();
  const history = useHistory();
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

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      rowSpacing={5}
    >
      <Grid item>
        <Typography variant="h1" align="center">
          Rating Expert
        </Typography>
      </Grid>
      {valid && (
        <Alert>
          The email or password you entered is not correct. Please double-check
          and try again.
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
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
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
          <Button onClick={handleSignIn}>Sign In</Button>
          <Button variant="contained">Sign up</Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
