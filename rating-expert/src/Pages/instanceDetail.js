import { Typography, Grid, Button } from "@mui/material";

import { useParams } from "react-router";
import { useHistory } from "react-router";
import { useEffect } from "react";
import axios from "axios";
import { baseURL } from "./instanceSlice";

export default function InstanceDetail() {
  const paramsHook = useParams();
  const history = useHistory();
  let instanceInfo;

  useEffect(async () => {
    const resp = await axios.get(`${baseURL}/:Category:/name`, {
      params: { name: paramsHook.name },
    });
    if (!resp) console.log("error fetching instance data");
    else instanceInfo = resp;
  }, []);

  const Back = () => {
    history.push(`/main/${paramsHook.category}`);
  };

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Typography>Hello</Typography>
      <Typography>Category</Typography>
      <Typography>Date</Typography>
      <Typography>Rating</Typography>
      <Typography>Description</Typography>
      <Typography>Reason</Typography>
      <Button variant="contained" onClick={Back}>
        Back
      </Button>
    </Grid>
  );
}
