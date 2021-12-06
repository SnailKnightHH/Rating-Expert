import AppBar from "./Features/AppBar";
import MainPage from "./Pages/main";
import InstanceList from "./Pages/InstanceList";
import { Route, Switch, Redirect } from "react-router-dom";
import AddInstancePage from "./Pages/newInstance";
import { Typography } from "@mui/material";
import InstanceDetail from "./Pages/instanceDetail";
import { ProvideAuth } from "./Features/userAuth";

function App() {
  return (
    <ProvideAuth>
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
          <Route path="/main/:category/Create" exact>
            <AddInstancePage />
          </Route>
          <Route path="/main/:category/:name" exact>
            <InstanceDetail />
          </Route>
          <Route path="*">
            <Typography>404 Page not found</Typography>
          </Route>
        </Switch>
      </AppBar>
    </ProvideAuth>
  );
}

export default App;
