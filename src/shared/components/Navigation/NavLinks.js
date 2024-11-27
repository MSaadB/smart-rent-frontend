import React from "react";
import "./NavLinks.css";
import { NavLink } from "react-router-dom";
import NewListing from "../../../listings/pages/NewListing";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const NavLinks = (props) => {
  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/listings" exact>
          Listings
        </NavLink>
      </li>
      <li>
        <NavLink to="/users">Users</NavLink>
      </li>
      <li>
        <NavLink to="/properties/new">Add Listing</NavLink>
      </li>
    </ul>
  );
};

export default NavLinks;
