import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import MainPage from "./shared/pages/MainPage";
import NewListing from "./listings/pages/NewListing";
import Users from "./users/pages/Users";
import Listings from "./listings/pages/Listings";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import Auth from "./users/pages/Auth";
import { AuthContext } from "./shared/context/auth-context";
import UpdateListing from "./listings/pages/UpdateListing";
import { useAuth } from "./shared/hooks/auth-hook";
import UserListings from "./listings/pages/UserListings";

const App = () => {
  const { token, login, logout, userId } = useAuth();


  let routes;

  if (token) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <MainPage />
        </Route>
        <Route path="/:userId/properties" exact>
          <UserListings />
        </Route>
        <Route path="/properties/new" exact>
          <NewListing />
        </Route>
        <Route path="/properties/:propertyId">
          <UpdateListing />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <MainPage />
        </Route>
        <Route path="/properties" exact>
          <Listings />
        </Route>
        <Route path="/auth">
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <MainNavigation />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
