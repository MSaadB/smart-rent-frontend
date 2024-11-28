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
import { AuthContext, AuthProvider } from "./shared/context/auth-context";
import React, { useState, useCallback } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(false);

  const login = useCallback((uid) => {
    setIsLoggedIn(true);
    setUserId(uid);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null);
  }, []);


  let routes;

  if (isLoggedIn) {
    routes = (
      <Switch>
        <Route path="/" exact>
        <MainPage />
      </Route>
        <Route path="/properties/user/:uemail" exact>
          <Listings />
        </Route>
        <Route path="/properties/new" exact>
          <NewListing />
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
        isLoggedIn: isLoggedIn,
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
