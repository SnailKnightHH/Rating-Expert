import { Typography, Grid, Button, Box, LinearProgress } from "@mui/material";

import { useParams } from "react-router";
import { useHistory } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseURL } from "./instanceSlice";

export default function InstanceDetail() {
  const paramsHook = useParams();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [instanceInfo, setInstanceInfo] = useState(null);

  useEffect(async () => {
    const resourcePath = `${baseURL}/:category/${paramsHook.name}`;
    const resp = await axios.get(resourcePath, {
      params: { name: paramsHook.name },
    });
    if (!resp) console.log("error fetching instance data");
    else {
      setInstanceInfo(resp.data);
      setIsLoading(false);
    }
    console.log("instanceInfo", resp.data);
  }, []);

  const Back = () => {
    history.push(`/main/${paramsHook.category}`);
  };

  if (isLoading) {
    return (
      <Box sx={{ width: "100%" }}>
        <LinearProgress />
      </Box>
    );
  } else if (!isLoading && instanceInfo != null) {
    return (
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Typography>{instanceInfo.name}</Typography>
        <Typography>{instanceInfo.category}</Typography>
        <Typography>{instanceInfo.date.split("T")[0]}</Typography>
        <Typography>{instanceInfo.rating}</Typography>
        <Typography>{instanceInfo.description}</Typography>
        <Typography>{instanceInfo.reason}</Typography>
        <Button variant="contained" onClick={Back}>
          Back
        </Button>
      </Grid>
    );
  }
  return null;
}
