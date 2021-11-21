import {
  Button,
  Typography,
  Grid,
  TextField,
  Box,
  Rating,
  Alert,
} from "@mui/material";

import { useState } from "react";
import { useHistory, useParams } from "react-router";
import { createInstance } from "./instanceSlice";
import { useDispatch } from "react-redux";

export default function AddInstancePage() {
  const [value, setValue] = useState(null);
  const [hover, setHover] = useState(-1);
  const params = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const instanceDraft = {
    id: "",
    name: "",
    rating: 0,
    websiteLink: "",
    description: "",
    reason: "",
    category: params.category,
    sub_category: "",
    country_of_origin: "",
    createDate: Date.now(),
    updateDate: null,
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
      history.push(`/main/${params.category}`);
      console.log("reached");
    }
  };

  const handleChange = (key) => (event) => {
    if (key === "rating") {
      setValue(event.target.value);
    }
    setDraft({
      ...draft,
      [key]: event.target.value,
    });
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

      <Grid
        container
        spacing={3}
        alignItems="center"
        justifyContent="center"
        marginTop={3}
      >
        <Grid item>
          <Button variant="contained">Back</Button>
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
