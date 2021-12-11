import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";

import React, { useState } from "react";
import CustomCard from "../Features/customCard";
import Camera from "../Images/Camera.jpg";
import Gaming from "../Images/Gaming.jpg";

const useStyles = makeStyles({
  title: {
    marginTop: 24,
    marginBottom: 24,
    fontSize: 40,
  },
});

export default function MainPage() {
  const classes = useStyles();
  const [query, setQuery] = useState("");

  const handleSearchQuery = (event) => {
    setQuery(event.target.value);
  };

  const allCategories = [
    {
      title: "Movies",
      img: Camera,
    },
    {
      title: "Games",
      img: Gaming,
    },
  ].filter((category) => {
    if (query.trim() === "") return true;
    else
      return category.title.toLowerCase().includes(query.trim().toLowerCase());
  });

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
            onChange={handleSearchQuery}
          />
          <IconButton sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
      </Box>
      <Grid container spacing={3}>
        {allCategories.map((category) => (
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
            <CustomCard
              img={category.img}
              title={category.title}
              altText={category.title}
            />
          </Grid>
        ))}
      </Grid>
    </React.Fragment>
  );
}
