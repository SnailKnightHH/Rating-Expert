import {
  Typography,
  Grid,
  Button,
  Box,
  LinearProgress,
  Paper,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

import { useParams } from "react-router";
import { useHistory } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseURL } from "../Constants/constants";

const useStyles = makeStyles({
  title: {
    marginTop: 24,
    marginBottom: 24,
    fontSize: 40,
  },
  sub_category: {
    marginBottom: 24,
    fontSize: 24,
  },
  paperGreen: {
    backgroundColor: "#3dcc54",
  },
  paperYellow: {
    backgroundColor: "#f1cc24",
  },
  PaperRed: {
    backgroundColor: "#f14624",
  },
  rating: {
    color: "white",
    textAlign: "center",
    lineHeight: "240%",
    fontSize: "2rem",
  },
  back: {
    marginTop: "3rem",
  },
  descriptionAndReasons: {
    maxWidth: "60%",
  },
});

export default function InstanceDetail() {
  const classes = useStyles();

  const customPaper = (rating) => {
    return (
      <Paper
        className={
          rating >= 7
            ? classes.paperGreen
            : rating >= 5
            ? classes.paperYellow
            : classes.PaperRed
        }
        elevation={0}
        sx={{
          minWidth: "5rem",
          minHeight: "5rem",
          marginTop: "1.5rem",
          marginBottom: "1.5rem",
        }}
      >
        <Typography className={classes.rating}>{rating}</Typography>
      </Paper>
    );
  };

  const paramsHook = useParams();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [instanceInfo, setInstanceInfo] = useState(null);

  useEffect(async () => {
    const resourcePath = `${baseURL}/main/:category/${paramsHook.name}`;
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
        <Typography className={classes.title}>{instanceInfo.name}</Typography>
        <Typography className={classes.sub_category}>
          {instanceInfo.sub_category}
        </Typography>
        <Typography>{instanceInfo.date.split("T")[0]}</Typography>
        {customPaper(instanceInfo.rating)}
        <Box display="flex" justifyContent="center" marginTop="2.5rem">
          <Typography>{"Description: "}</Typography>
        </Box>
        <Typography className={classes.descriptionAndReasons}>
          {instanceInfo.description}
        </Typography>
        <Box display="flex" justifyContent="center" marginTop="2.5rem">
          <Typography>{"Reason: "}</Typography>
        </Box>
        <Typography className={classes.descriptionAndReasons}>
          {instanceInfo.reason}
        </Typography>
        <Button variant="contained" className={classes.back} onClick={Back}>
          Back
        </Button>
      </Grid>
    );
  }
  return null;
}
