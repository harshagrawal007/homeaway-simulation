import React, { Component } from "react";
import { Route } from "react-router-dom";
import TravelerLogin from "./TravelerLogin";
import Signup from "./Signup";
import OwnerSignup from "./OwnerSignup";
import Home from "./home";
import OwnerLogin from "./OwnerLogin";

import AddPropertyDetails from "./AddPropertyDetails";
import Profile from "./profile";

import "./App.css";

class App extends Component {

  render() {

    return (
      //Use Browser Router to route to different pages
      <div>
        <Route path="/home" component={Home} />
        <Route path="/Signup" component={Signup} />
        <Route path="/OwnerSignup" component={OwnerSignup} />
        <Route path="/TravelerLogin" component={TravelerLogin} />
        <Route path="/AddPropertyDetails" component={AddPropertyDetails} />
       
        <Route path="/OwnerLogin" component={OwnerLogin} />
        <Route path="/Profile" component={Profile} />
       
      </div>
    );
  }
}

export default App;
