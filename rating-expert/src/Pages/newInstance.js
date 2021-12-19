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

import { useState, useEffect, useRef } from "react";
import { useHistory, useParams } from "react-router";
import { createInstance, changeStatusToIdle } from "./instanceSlice";
import { useDispatch, useSelector } from "react-redux";
import subCategories from "../Constants/subCategories";
import { selectAllInstances } from "./instanceSlice";

export default function AddInstancePage() {
  // const nameTest = useRef();
  const [isEdit, setIsEdit] = useState(false);
  const [nameField, setNameField] = useState("");
  const [webLinkField, setWebLinkField] = useState("");
  const [descriptionField, setDescriptionField] = useState("");
  const [reasonField, setReasonField] = useState("");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [value, setValue] = useState(null);
  const [hover, setHover] = useState(-1);
  const params = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector((state) => state.user.user);
  const allInstancesNames = useSelector(selectAllInstances).map(
    (instance) => instance.name
  );

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
    user,
  };

  useEffect(() => {
    const instanceInfo = JSON.parse(localStorage.getItem("instanceDetail"));
    if (instanceInfo) {
      setNameField(instanceInfo.name);
      setWebLinkField(instanceInfo.websiteLink);
      setDescriptionField(instanceInfo.description);
      setReasonField(instanceInfo.reason);
      setCategory(
        subCategories[instanceInfo.category].findIndex(
          (element) => element === instanceInfo.sub_category
        )
      );
      setIsEdit(true);
      setCurrentDate(instanceInfo.date.split("T")[0]);
      setValue(instanceInfo.rating);
      setDraft({ ...instanceInfo, oldName: instanceInfo.name });
      localStorage.removeItem("instanceDetail");
    }
  }, []);

  const [draft, setDraft] = useState(instanceDraft);
  const [publishWarning, setPublishWarning] = useState(false);
  const [duplicateWarning, setDuplicateWarning] = useState(false);

  const publishOrEditInstance = () => {
    if (
      !draft.name.trim() ||
      !draft.description.trim() ||
      !draft.reason.trim()
    ) {
      setPublishWarning(true);
      return;
    } else {
      setPublishWarning(false);
      console.log("isEdit frontend", isEdit, draft);
      dispatch(createInstance({ ...draft, ifEdit: isEdit }));
      if (allInstancesNames.includes(draft.name)) {
        setDuplicateWarning(true);
      } else {
        setDuplicateWarning(false);
        dispatch(changeStatusToIdle());
        history.push(`/main/${params.category}`);
      }
    }
  };

  const DateConversion = (DateParam) => {
    const [year, month, day] = DateParam.split("-");
    const ISODate = new Date(`${month} ${day}, ${year} 00:00:00`);
    setCurrentDate(ISODate);

    return Date.parse(ISODate); // must be serializable
  };

  const perCharChange = (key) => (event) => {
    const input = event.target.value;

    if (key === "name") {
      setNameField(input);
    } else if (key === "websiteLink") {
      setWebLinkField(input);
    } else if (key === "description") {
      setDescriptionField(input);
    } else if (key === "reason") {
      setReasonField(input);
    }
  };

  const handleChange = (key) => (event) => {
    const input = event.target.value;

    if (key === "rating") {
      setValue(input);
    }
    if (key === "sub_category") {
      setCategory(input);
      setDraft({
        ...draft,
        [key]: subCategories[params.category][input],
      });
      return;
    }
    if (key === "Date") {
      const formattedDate = DateConversion(input);

      setDraft({
        ...draft,
        [key]: formattedDate,
      });
      return;
    }

    setDraft({
      ...draft,
      [key]: input,
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
      {duplicateWarning && (
        <Box marginBottom={3} sx={{ width: 1 / 4 }}>
          <Alert severity="error">
            A {params.category.slice(0, -1).toLowerCase()} with name{" "}
            {draft.name} already exists.
          </Alert>
        </Box>
      )}
      <Box sx={{ width: 1 / 4 }} marginBottom={3}>
        <TextField
          required
          id="Name"
          label="Name"
          fullWidth
          onBlur={handleChange("name")}
          onChange={perCharChange("name")}
          value={nameField}
          // ref={nameTest}
          // defaultValue={nameTest.current ? nameTest.current.value : ""}
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
          value={value}
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
          value={webLinkField}
          onBlur={handleChange("websiteLink")}
          onChange={perCharChange("websiteLink")}
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
          value={descriptionField}
          onBlur={handleChange("description")}
          onChange={perCharChange("description")}
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
          value={reasonField}
          onBlur={handleChange("reason")}
          onChange={perCharChange("reason")}
        />
      </Box>
      <Box marginTop={6}>
        <TextField
          id="Instance Publish Date"
          label="Date"
          type="date"
          value={isEdit ? currentDate : currentDate.toISOString().split("T")[0]}
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
          <Button variant="contained" onClick={publishOrEditInstance}>
            {isEdit ? "Edit" : "Publish"}
          </Button>
        </Grid>
      </Grid>
      {/* fine tune button colors*/}
    </Grid>
  );
}
