import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";

import React from "react";
import Card from "./card";
import Camera from "../Images/Camera.jpg";

const useStyles = makeStyles({
  title: {
    marginTop: 24,
    marginBottom: 24,
    fontSize: 40,
  },
});

export default function MainPage() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Typography variant="h1" align="center" className={classes.title}>
        Rating Expert
      </Typography>
      <Box display="flex" justifyContent="center">
        <Paper
          component="form"
          elevation={3}
          sx={{
            p: "2px 4px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: 450,
          }}
          style={{ "border-radius": "30rem", marginBottom: "2rem" }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search Category"
            inputProps={{ "aria-label": "search Category" }}
          />
          <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
          <Card img={Camera} title={"Movies"} altText="Camera" />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
          <Card img={Camera} title={"Movies"} altText="Camera" />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
          <Card img={Camera} title={"Movies"} altText="Camera" />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
          <Card img={Camera} title={"Movies"} altText="Camera" />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
          <Card img={Camera} title={"Movies"} altText="Camera" />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
          <Card img={Camera} title={"Movies"} altText="Camera" />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
          <Card img={Camera} title={"Movies"} altText="Camera" />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
          <Card img={Camera} title={"Movies"} altText="Camera" />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
