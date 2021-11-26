import {
  CardActionArea,
  CardHeader,
  Typography,
  Card,
  CardContent,
  TextField,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableFooter,
  TablePagination,
  Paper,
  Select,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  IconButton,
  Box,
} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import AppsIcon from "@mui/icons-material/Apps";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import StarIcon from "@mui/icons-material/Star";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { useTheme } from "@mui/material/styles";

import { useParams, useHistory } from "react-router";
import { useState, useEffect, Fragment } from "react";
import subCategories from "../subCategories";
import { selectAllInstances, fetchAllInstances } from "./instanceSlice";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

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
    history.push(`/main/${params.category}/Create`);
  };

  const instancesStatus = useSelector((state) => state.instances.status);

  useEffect(() => {
    if (instancesStatus === "idle") {
      dispatch(fetchAllInstances("1")); // temp user id
    }
  }, [instancesStatus, allInstances, dispatch]);

  function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
      onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
      onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
      onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
      onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
      <Box sx={{ flexShrink: 0, ml: 2.5 }}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </Box>
    );
  }

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - allInstances.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const InstancesList = () => {
    console.log("allInstances", allInstances);
    if (viewMode === "Grid") {
      return allInstances.map((instance) => (
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
          <Card>
            <CardActionArea
              component={Link}
              to={`/main/${params.category}/${instance.name}`}
            >
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
    } else if (viewMode === "List") {
      let listNum = 0;
      return (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell style={{ width: "5vw" }}>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;#
                </TableCell>
                <TableCell style={{ width: "15vw" }}>Name</TableCell>
                <TableCell>Description&nbsp;</TableCell>
                <TableCell align="right">Date&nbsp;</TableCell>
                <TableCell align="right">Rating&nbsp;</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? allInstances.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : allInstances
              ).map((row) => {
                listNum++;

                return (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <Button> {listNum}</Button>
                    </TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.description}</TableCell>
                    <TableCell align="right">{row.date}</TableCell>
                    <TableCell align="right">{row.rating}</TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  colSpan={3}
                  count={allInstances.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      "aria-label": "rows per page",
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  ActionsComponent={TablePaginationActions}
                  rowsPerPageOptions={[10]}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      );
    }
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
