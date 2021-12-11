import {
  Grid,
  TextField,
  Typography,
  Button,
  InputAdornment,
  Box,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

export default function Profile() {
  const user = useSelector((state) => state.user.user);
  const history = useHistory();

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

  return (
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
                <Button>Change</Button>
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
      {user.posts.map((post) => (
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
  );
}
