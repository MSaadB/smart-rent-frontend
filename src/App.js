import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import NewListing from "./listings/pages/NewListing";
import Users from "./users/pages/Users";
import Listings from "./listings/pages/Listings";
import MainNavigation from "./shared/components/Navigation/MainNavigation";

const App = () => {
  return (
    <Router>
      <MainNavigation />
      <main>
      <Switch>
        <Route path="/" exact>
          <Listings />
        </Route>
        <Route path="/listings/new" exact>
          <NewListing />
        </Route>
        <Route path="/users" exact>
          <Users />
        </Route>
        <Route path="/listings" exact>
          <Listings />
        </Route>
        <Redirect to="/" />
      </Switch>
      </main>
    </Router>
  );
};

export default App;
