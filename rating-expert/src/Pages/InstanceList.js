import {
  CardActionArea,
  CardHeader,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
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
import StarIcon from "@mui/icons-material/Star";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Button from "@mui/material/Button";

import { useParams, useHistory } from "react-router";
import { useState, useEffect, Fragment } from "react";
import subCategories from "../subCategories";
import { selectAllInstances, fetchAllInstances } from "./instanceSlice";
import { useSelector, useDispatch } from "react-redux";

export default function InstanceList() {
  const params = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const allInstances = useSelector(selectAllInstances).filter(
    (instance) => instance.category === params.category
  );

  const [category, setCategory] = useState("");

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  const [viewMode, setViewMode] = useState("Grid");

  const handleViewModeChange = (event, newViewMode) => {
    setViewMode(newViewMode);
  };

  const createInstance = () => {
    history.push(`/main/${params.category}/Create?Category=${params.category}`);
  };

  const instancesStatus = useSelector((state) => state.instances.status);

  // stack overflow refresh only once solution
  // window.onload = function () {
  //   if (!window.location.hash) {
  //     window.location = window.location + "#loaded";
  //     window.location.reload();
  //   }
  // };

  // if (window.localStorage) {
  //   if (!localStorage.getItem("firstLoad")) {
  //     localStorage["firstLoad"] = true;
  //     window.location.reload();
  //   } else localStorage.removeItem("firstLoad");
  // }

  useEffect(() => {
    if (instancesStatus === "idle") {
      dispatch(fetchAllInstances("1")); // temp user id
    }
  }, [instancesStatus, allInstances, dispatch]);

  const InstancesList = () => {
    console.log("allInstances", allInstances);
    if (viewMode === "Grid") {
      return allInstances.map((instance) => (
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
          <Card>
            <CardActionArea>
              <CardContent>
                <Typography>{instance.name}</Typography>
                <Typography>
                  <StarIcon />
                  {`: ${instance.rating}`}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ));
    }
    return null;
  };

  return (
    <Fragment>
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
            value={viewMode}
            exclusive
            onChange={handleViewModeChange}
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
      <Grid container spacing={3} marginTop={3}>
        <InstancesList />
      </Grid>
    </Fragment>
  );
}
