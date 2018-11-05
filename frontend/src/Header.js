import React, { Component } from "react";
import { Link } from "react-router-dom";
import cookie from "react-cookies";
import { connect } from 'react-redux';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import "./styles/header.scss";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false
      
    };
  }
  // onClickLogin = option => {
  //   this.props.onClick(option.value);
  // };

  handleLogout = () => {
    cookie.remove("travellercookie", { path: "/" });
    cookie.remove("ownercookie", { path: "/" });
  };

  toggle = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  };
  render() {
    let temp = null;
    console.log("props auth flag"+this.props.authFlag );
    console.log("props email "+this.props.email );
    console.log("props email "+this.props.owneremail );
    if (this.props.authFlag) {
    if (localStorage.getItem('type') === "traveller") {
      //if (this.props.authFlag) {
      temp = (
        <Dropdown className="header-menu"
          isOpen={this.state.dropdownOpen}
          toggle={() => this.toggle()} >
          <DropdownToggle caret>
            {this.props.email}
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem >
              { <Link to="/Profile"></Link> }
              profile
            </DropdownItem>
            <DropdownItem>
              {/* <Link to="/Tripboards">Mytrips</Link> */}
              mytrips
            </DropdownItem>
            <DropdownItem href="/home" onClick={this.handleLogout}>
              Logout
</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      );
    }
    else if (localStorage.getItem('type') === "owner") {
      temp = (
        <Dropdown className="header-menu"
          isOpen={this.state.dropdownOpen}
          toggle={() => this.toggle()} >
          <DropdownToggle caret>
          {this.props.email}
          </DropdownToggle>
          <DropdownMenu>
            {/* <DropdownItem >
              {/* <Link to="/Myprofile">Profile</Link>         */}
              {/* profile
              </DropdownItem> */} 
            <DropdownItem>
              {/* <Link to="/MyProperties">Myproperties</Link> */}
              dashboard
            </DropdownItem>
            <DropdownItem href="/home" onClick={this.handleLogout}>
              Logout
</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      );
    }}
    else {
      temp = (
        <Dropdown
          className="header-menu"
          isOpen={this.state.dropdownOpen}
          toggle={() => this.toggle()}
        >
          <DropdownToggle caret>Login</DropdownToggle>
          <DropdownMenu>
            <DropdownItem>
              <Link to="/TravelerLogin">Traveler Login</Link>
            </DropdownItem>
            <DropdownItem>
              <Link to="/OwnerLogin">Owner Login</Link>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      );

    }

    return (
      <div>
        <div>
          <nav className="navbar navbar-expand-lg navbar-light ">
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                {/* <div className="header"> */}
                <Link className="logo" to="/home">
                  <img
                    src="https://csvcus.homeaway.com/rsrcs/cdn-logos/2.10.6/bce/moniker/homeaway_us/logo-bceheader.svg"
                  />
                </Link>
                {/* </div> */}
              </ul>
              <ul className="nav navbar-nav navbar-right">
                <li> {temp}</li>
                <li>
                  <Link to="/AddpropertyDetails">
                    <button type="button" className="lyp">
                      List your Property
        </button></Link>
                </li>
                <li><img
                  className="logo-image"
                  src="https://csvcus.homeaway.com/rsrcs/cdn-logos/2.10.6/bce/moniker/homeaway_us/birdhouse-bceheader.svg"
                  alt="logo"
                  title="logo"
                /></li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state =>{
  return {
      authFlag : state.authFlag,
      email:state.email
  }
}


export default connect(mapStateToProps)(Header);
