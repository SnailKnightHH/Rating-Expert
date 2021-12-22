import {
  CardActionArea,
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
  Tooltip,
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
import subCategories from "../Constants/subCategories";
import { selectAllInstances, fetchAllInstances } from "./instanceSlice";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

export default function InstanceList() {
  const params = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.user.loggedIn);

  const [category, setCategory] = useState(0);
  const instanceSubCategory = subCategories[params.category];

  const handleSubCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const [query, setQuery] = useState("");
  const handleSearchQuery = (event) => {
    setQuery(event.target.value);
  };

  const unfilteredAllInstances = useSelector(selectAllInstances);
  const unfilteredInstancesLength = unfilteredAllInstances.length;
  const allInstances = unfilteredAllInstances
    .filter((instance) => instance.category === params.category) // categories filter
    .filter((instance) => {
      // sub categories filter
      if (instanceSubCategory[category] === "All") return true;
      else return instance.sub_category === instanceSubCategory[category];
    })
    .filter((instance) => {
      // search query filter
      if (query.trim() === "") return true;
      else
        return instance.name.toLowerCase().includes(query.trim().toLowerCase());
    });

  const [viewMode, setViewMode] = useState("Grid");

  const handleViewModeChange = (event, newViewMode) => {
    // press same button twice somehow will result in hull
    if (newViewMode !== null) setViewMode(newViewMode);
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

  const backToMain = () => {
    history.push("/main");
  };

  const InstancesList = () => {
    if (viewMode === "Grid") {
      return allInstances.map((instance) => (
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
          <Card>
            <CardActionArea
              sx={{ minHeight: "8rem" }}
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
                      <Button
                        component={Link}
                        to={`/main/${params.category}/${row.name}`}
                      >
                        {" "}
                        {listNum}
                      </Button>
                    </TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.description}</TableCell>
                    <TableCell align="right">
                      {row.date.split("T")[0]}
                    </TableCell>
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
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={category}
              displayEmpty={true}
              label="category"
              onChange={handleSubCategoryChange}
            >
              {instanceSubCategory.map((instance, index) => (
                <MenuItem value={index}>{instance}</MenuItem>
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
            onChange={handleSearchQuery}
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
          <Button variant="contained" onClick={backToMain}>
            Back
          </Button>
        </Grid>
        <Grid item marginTop={0.5}>
          {loggedIn && (
            <Button variant="contained" onClick={createInstance}>
              Create
            </Button>
          )}
          {!loggedIn && (
            <Tooltip title="Login to create ratings">
              <span>
                <Button variant="contained" disabled>
                  Create
                </Button>
              </span>
            </Tooltip>
          )}
        </Grid>
      </Grid>
      {allInstances.length === 0 ? (
        <Typography sx={{ marginTop: "2rem" }}>
          There are no {params.category.toLowerCase()} available.
        </Typography>
      ) : (
        <Typography sx={{ marginTop: "2rem" }}>
          {allInstances.length} of {unfilteredInstancesLength}{" "}
          {params.category.toLowerCase()} available.
        </Typography>
      )}
      <Grid container spacing={3} marginTop={3}>
        {allInstances.length !== 0 && <InstancesList />}
      </Grid>
    </Fragment>
  );
}
