import AppBar from "./Components/AppBar";
import MainPage from "./Pages/main";
import InstanceList from "./Pages/InstanceList";
import { Route, Switch, Redirect } from "react-router-dom";

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
        <Route path="/main/:category">
          <InstanceList />
        </Route>
      </Switch>
    </AppBar>
  );
}

export default App;
