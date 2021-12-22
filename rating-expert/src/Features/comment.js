import { Grid, Typography, Paper } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";

export default function Comment({ userName, Reason, Rating, Date }) {
  return (
    <Paper
      sx={{
        p: 2,
        margin: "auto",
        maxWidth: "70%",
        flexGrow: 1,
        marginTop: "2rem",
      }}
    >
      <Grid container spacing={2}>
        <Grid item>
          <AccountCircle />
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
                {userName}
              </Typography>
              <Typography variant="body2" gutterBottom>
                {Reason}
              </Typography>
            </Grid>
            <Grid item>
              <Typography sx={{ cursor: "pointer" }} variant="body2">
                Rating: {Rating}
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" component="div">
              {Date.split("T")[0]}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
