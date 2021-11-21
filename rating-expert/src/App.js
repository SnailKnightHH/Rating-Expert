import AppBar from "./Features/AppBar";
import MainPage from "./Pages/main";
import InstanceList from "./Pages/InstanceList";
import { Route, Switch, Redirect } from "react-router-dom";
import AddInstancePage from "./Pages/newInstance";
import { Typography } from "@mui/material";

function App() {
  return (
    <AppBar>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/main" />
        </Route>
        <Route path="/main" exact>
          <MainPage />
        </Route>
        <Route path="/main/:category" exact>
          <InstanceList />
        </Route>
        {/* <Route path="/main/:category/:instance" exact>
          <DetailPage />
        </Route> */}
        <Route path="/main/:category/Create">
          <AddInstancePage />
        </Route>
        <Route path="*">
          <Typography>404 Page not found</Typography>
        </Route>
      </Switch>
    </AppBar>
  );
}

export default App;
