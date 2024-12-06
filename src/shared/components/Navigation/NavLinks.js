import React, {useContext} from "react";
import "./NavLinks.css";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";

const NavLinks = (props) => {
  const auth = useContext(AuthContext);
  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact>
          HOME
        </NavLink>
        </li>
      {auth.isLoggedIn ? (
        <li>
        <NavLink to={`/${auth.userId}/properties`}>MY PROPERTIES</NavLink>
      </li>
      ): null}
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/properties/new">ADD PROPERTY</NavLink>
        </li>
      )}
      {!auth.isLoggedIn && (
        <li>
          <NavLink to="/auth">SIGNUP/LOGIN</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <button onClick={auth.logout}>LOGOUT</button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
