import {
  Button,
  Typography,
  Grid,
  TextField,
  Box,
  Rating,
  Alert,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Autocomplete,
} from "@mui/material";

import { useState } from "react";
import { useHistory, useParams } from "react-router";
import { createInstance, changeStatusToIdle } from "./instanceSlice";
import { useDispatch } from "react-redux";
import subCategories from "../subCategories";

export default function AddInstancePage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [value, setValue] = useState(null);
  const [hover, setHover] = useState(-1);
  const params = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const [category, setCategory] = useState("");

  const instanceDraft = {
    id: "",
    name: "",
    rating: 0,
    websiteLink: "",
    description: "",
    reason: "",
    category: params.category,
    sub_category: "",
    date: currentDate,
  };

  const [draft, setDraft] = useState(instanceDraft);
  const [publishWarning, setPublishWarning] = useState(false);

  const publishInstance = () => {
    if (
      !draft.name.trim() ||
      !draft.description.trim() ||
      !draft.reason.trim()
    ) {
      setPublishWarning(true);
      return;
    } else {
      setPublishWarning(false);
      dispatch(createInstance(draft));
      console.log("params.category", params.category);
      dispatch(changeStatusToIdle());
      history.push(`/main/${params.category}`);
      console.log("publish successful", draft);
    }
  };

  const DateConversion = (DateParam) => {
    const [year, month, day] = DateParam.split("-");
    const ISODate = new Date(`${month} ${day}, ${year} 00:00:00`);
    setCurrentDate(ISODate);
    console.log("Date.parse(ISODate)", Date.parse(ISODate));
    return Date.parse(ISODate); // must be serializable 
  };

  const handleChange = (key) => (event) => {
    if (key === "rating") {
      setValue(event.target.value);
    }
    if (key === "sub_category") {
      setCategory(event.target.value);
      setDraft({
        ...draft,
        [key]: subCategories[params.category][event.target.value],
      });
      return;
    }
    if (key === "Date") {
      console.log(event.target.value);
      const formattedDate = DateConversion(event.target.value);
      console.log("formattedDate", formattedDate);
      setDraft({
        ...draft,
        [key]: formattedDate,
      });
      return;
    }

    setDraft({
      ...draft,
      [key]: event.target.value,
    });
  };

  const Back = () => {
    history.push(`/main/${params.category}`);
  };

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      {publishWarning && (
        <Box marginBottom={3} sx={{ width: 1 / 4 }}>
          <Alert severity="error">Please fill out all required fields.</Alert>
        </Box>
      )}
      <Box sx={{ width: 1 / 4 }} marginBottom={3}>
        <TextField
          required
          id="Name"
          label="Name"
          fullWidth
          onBlur={handleChange("name")}
        />
      </Box>
      <Box sx={{ width: 1 / 4 }} marginBottom={3}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={category}
            label="category"
            onChange={handleChange("sub_category")}
          >
            {subCategories[params.category].map((instance, index) => (
              <MenuItem value={index}>{instance}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box
        marginTop={1}
        sx={{
          width: 260,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Rating
          name="half-rating"
          defaultValue={0}
          max={10}
          precision={0.5}
          onChange={handleChange("rating")}
          onChangeActive={(event, newHover) => {
            setHover(newHover);
          }}
        />
        {hover !== -1 && <Box sx={{ ml: 2 }}>{hover}</Box>}
        {hover === -1 && value !== null && <Box sx={{ ml: 2 }}>{value}</Box>}
      </Box>

      <Box sx={{ width: 1 / 4 }} marginTop={6}>
        <TextField
          id="related weblink"
          label="WebLink"
          fullWidth
          onBlur={handleChange("websiteLink")}
        />
      </Box>

      <Box sx={{ width: 1 / 4 }} marginTop={6}>
        <TextField
          id="Instance Description"
          label="Description"
          multiline
          rows={4}
          inputProps={{ style: { resize: "vertical" } }}
          fullWidth
          required
          onBlur={handleChange("description")}
        />
      </Box>

      <Box sx={{ width: 1 / 4 }} marginTop={6}>
        <TextField
          id="Rating Reasoning"
          label="Reason"
          multiline
          rows={4}
          inputProps={{ style: { resize: "vertical" } }}
          fullWidth
          required
          onBlur={handleChange("reason")}
        />
      </Box>
      <Box marginTop={6}>
        <TextField
          id="Instance Publish Date"
          label="Date"
          type="date"
          value={currentDate.toISOString().split("T")[0]}
          onChange={handleChange("Date")}
        />
      </Box>
      <Grid
        container
        spacing={3}
        alignItems="center"
        justifyContent="center"
        marginTop={3}
      >
        <Grid item>
          <Button variant="contained" onClick={Back}>
            Back
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={publishInstance}>
            Publish
          </Button>
        </Grid>
      </Grid>
      {/* fine tune button colors*/}
      {/* Conditionally render list of user reasonings */}
    </Grid>
  );
}
