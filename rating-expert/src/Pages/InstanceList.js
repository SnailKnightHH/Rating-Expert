import { Typography } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { useParams } from "react-router";
import React from "react";
import subCategories from "../subCategories";

export default function InstanceList({ title }) {
  const params = useParams();

  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <React.Fragment>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          {subCategories.title.map((instance, index) => (
            <MenuItem value={index * 10}>{instance}</MenuItem>
          ))}

          {/* <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem> */}
        </Select>
      </FormControl>
      <Typography>{params.category}</Typography>
    </React.Fragment>
  );
}
