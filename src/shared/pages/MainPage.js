import React from "react";
import "./MainPage.css";
import Card from "../components/UIElements/Card";
import Button from "../components/FormElements/Button";
import Listings from "../../listings/pages/Listings";

const MainPage = (props) => {
  return (
    <div className="mainpage__info">
      <Card>
        <div className="mainpage__content">
        <h2>Welcome to SmartRent</h2>
        <i><h3>for all your housing rental needs</h3></i>
        </div>
        <h4>Please register if you would like to create a listing.</h4>
        <h4>Please login if you have already registered.</h4>
        <h4>You can browse listings without registering.</h4>
        <Button>Register</Button>
        <Button>Login</Button>
      </Card>

      <Listings />
    </div>
  );
};

export default MainPage;
