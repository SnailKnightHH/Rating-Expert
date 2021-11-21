import { Typography } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Grid } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import AppsIcon from "@mui/icons-material/Apps";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Button from "@mui/material/Button";

import { useParams, useHistory } from "react-router";
import React from "react";
import subCategories from "../subCategories";

export default function InstanceList() {
  const params = useParams();
  const history = useHistory();

  const [category, setCategory] = React.useState("");

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  const [alignment, setAlignment] = React.useState("Grid");

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const createInstance = () => {
    history.push(`/main/${params.category}/Create?Category=${params.category}`);
  };

  return (
    <Grid container>
      <Grid item xs={4}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={category}
            label="category"
            onChange={handleChange}
          >
            {console.log("instanceList", params.category)}
            {subCategories[params.category].map((instance, index) => (
              <MenuItem value={index * 10}>{instance}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={3} marginLeft={8}>
        <TextField
          id="search-for-name"
          label="Name"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={2}>
        <ToggleButtonGroup
          value={alignment}
          exclusive
          onChange={handleAlignment}
          aria-label="screen view"
        >
          <ToggleButton value="Grid" aria-label="Grid">
            <AppsIcon /> {/* Grid View*/}
          </ToggleButton>
          <ToggleButton value="List" aria-label="List">
            <FormatListBulletedIcon /> {/* List View*/}
          </ToggleButton>
        </ToggleButtonGroup>
      </Grid>
      <Grid item marginTop={0.5}>
        <Button variant="contained" onClick={createInstance}>
          Create
        </Button>
      </Grid>
    </Grid>
  );
}
