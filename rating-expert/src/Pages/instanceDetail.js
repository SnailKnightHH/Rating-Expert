import {
  Typography,
  Grid,
  Button,
  Box,
  LinearProgress,
  Paper,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

import { useParams } from "react-router";
import { useHistory } from "react-router";
import { useEffect, useState, Fragment, useCallback } from "react";
import axios from "axios";
import { baseURL } from "../Constants/constants";
import Comment from "../Features/comment";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useSelector } from "react-redux";

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
  const user = useSelector((state) => state.user.user);

  const [comment, setComment] = useState("");

  const changeComment = (event) => {
    setComment(event.target.value);
  };

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

  const roundTo2DecimalPlaces = (num) => {
    return Math.round(num * 100) / 100;
  };

  const calculateRating = () => {
    return roundTo2DecimalPlaces(
      (instanceInfo.rating +
        (instanceInfo.comments.length !== 0
          ? instanceInfo.comments.reduce((prev, cur) => prev + cur.rating, 0)
          : 0)) /
        (instanceInfo.comments.length + 1)
    );
  };

  const paramsHook = useParams();
  const history = useHistory();

  const EditInstance = () => {
    localStorage.setItem("instanceDetail", JSON.stringify(instanceInfo));
    history.push(`/main/${paramsHook.category}/Create`);
  };

  const [isLoading, setIsLoading] = useState(true);
  const [instanceInfo, setInstanceInfo] = useState(null);

  const fetchInstance = useCallback(async () => {
    const resourcePath = `${baseURL}/main/:category/${paramsHook.name}`;
    const resp = await axios.get(resourcePath, {
      params: { name: paramsHook.name },
    });
    if (!resp) console.log("error fetching instance data");
    else {
      setInstanceInfo(resp.data);
      setIsLoading(false);
    }
  }, [setInstanceInfo, setIsLoading, paramsHook.name]);

  useEffect(() => {
    fetchInstance();
  }, [fetchInstance]);

  const Back = () => {
    history.goBack();
  };

  const [commentRating, setCommentRating] = useState("");

  const addComment = async (comment, userName, name, rating) => {
    await axios.post(`${baseURL}/main/:category/createComment`, {
      params: { comment, userName, name, rating },
    });
    await fetchInstance();
    setCommentRating("");
    setComment("");
  };

  const handleChange = (event) => {
    setCommentRating(event.target.value);
  };

  if (isLoading) {
    return (
      <Box sx={{ width: "100%" }}>
        <LinearProgress />
      </Box>
    );
  } else if (!isLoading && instanceInfo != null) {
    return (
      <Fragment>
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
          {customPaper(calculateRating())}
          <Box display="flex" justifyContent="center" marginTop="2.5rem">
            <Typography>{"Related link: "}</Typography>
          </Box>
          <Button
            href={`${instanceInfo.websiteLink}`}
            style={{ textTransform: "none" }}
          >
            {instanceInfo.websiteLink}
          </Button>
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
        </Grid>

        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item>
            <Button variant="contained" className={classes.back} onClick={Back}>
              Back
            </Button>
          </Grid>
          {user !== null && instanceInfo.userName === user.userName && (
            <Grid item>
              <Button
                variant="contained"
                className={classes.back}
                onClick={EditInstance}
              >
                Edit
              </Button>
            </Grid>
          )}
        </Grid>

        <Paper
          sx={{
            p: 2,
            margin: "auto",
            maxWidth: "70%",
            flexGrow: 1,
            marginTop: "2rem",
          }}
        >
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            spacing={3}
          >
            <Grid item>
              <AccountCircle />
            </Grid>

            <Grid item xs={7}>
              <TextField
                id="add-comment"
                label="Add a public comment..."
                multiline
                variant="standard"
                fullWidth
                onChange={changeComment}
                value={comment}
              />
            </Grid>
            <Grid item xs={2}>
              <Box sx={{ minWidth: "3rem", maxWidth: "7rem" }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">rating</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={commentRating}
                    label="commentRating"
                    onChange={handleChange}
                  >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={6}>6</MenuItem>
                    <MenuItem value={7}>7</MenuItem>
                    <MenuItem value={8}>8</MenuItem>
                    <MenuItem value={9}>9</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid>
            <Grid item justifySelf="flex-end">
              <Button
                variant="contained"
                onClick={() =>
                  addComment(
                    comment,
                    user.userName,
                    instanceInfo.name,
                    commentRating
                  )
                }
                disabled={
                  comment.length === 0 ||
                  commentRating.length === 0 ||
                  user === null
                }
              >
                Weigh In
              </Button>
            </Grid>
          </Grid>
        </Paper>
        {instanceInfo.comments.map((comment) => (
          <Comment
            key={comment.userName + comment.date}
            userName={comment.userName}
            Reason={comment.reason}
            Rating={comment.rating}
            Date={comment.date}
          />
        ))}
      </Fragment>
    );
  }
  return null;
}
