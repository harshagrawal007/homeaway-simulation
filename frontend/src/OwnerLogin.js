import React, { Component } from "react";
import "./App.css";
import { Redirect } from "react-router-dom";
import axios from "axios";
import cookie from "react-cookies";
import Header from "./Header";
import { connect } from 'react-redux';

class OwnerLogin extends Component {
  constructor(props) {
    //Call the constrictor of Super class i.e The Component
    super(props);
  this.state = {
    owneremail:"",
    email: "",
    password: "",
    type:"",
    emailCheck: false,
    passwordCheck: false,
    authFlag: false
  };

  this.emailChangeHandler = this.emailChangeHandler.bind(this);
  this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
  };

    emailChangeHandler = e => {
      this.setState({
        email: e.target.value
      });
    };
    //password change handler to update state variable with the text entered by the user
    passwordChangeHandler = e => {
      this.setState({
        password: e.target.value
      });
    };
  
    handleSubmit = e => {
      e.preventDefault();
  
      const data = {
        email: this.state.email,
        password: this.state.password
      };
      console.log(""+ this.state.email);
      console.log("" +this.state.password );
      this.props.onSubmitHandle(data);  
    };
  render() {
    
    let redirectVar = null;
    //let cookieemail=  cookie.load("ownercookie");
    // if ((cookie.load("ownercookie")))   {
    //   console.log(cookieemail);
    //   redirectVar = <Redirect to="/home" />;
    // }
    if (this.props.authFlag)  {
      console.log(this.props.authFlag);
      redirectVar = <Redirect to="/home" />;
    }

    return (
      <div>
      {redirectVar}
     <Header></Header>


      <div className="owner-login">
        <div className="container">
          <div className="row">
            
            <div >
              <img
                className="banner"
                src="https://csvcus.homeaway.com/rsrcs/stab-cms-resources/0.10.35/images/cas/login-banner-sept16-1.png"
              />
            </div>
            <div className="col">
               <div>
                  <h3>Owner Login</h3>
                  <div className="form-group">
                    <input
                      autoFocus
                     
                      onChange={this.emailChangeHandler}
                      type="email"
                      name="email"
                      className=" form-control"
                      placeholder="Email address"
                    />
                  </div>
                  <div className="form-group">
                    <input
                     
                     onChange={this.passwordChangeHandler}
                      type="password"
                      name="psw"
                      className=" form-control"
                      placeholder="Password"
                    />
                  </div>
                  <div className="form-group">
                    <button
                     
                      type="submit"
                      className="form-control"
                      name="login"
                      onClick={this.handleSubmit}
                    >
                      Log in
              </button>
                  </div>
                  </div>
              
            </div>
            <div className="col">
            </div>
          </div>
        </div>
      </div>
      </div>
    );
  }
}

const mapStateToProps = state =>{
  return {
      authFlag : state.authFlag
  }
}

const mapDispatchStateToProps = dispatch => {
  return {
      onSubmitHandle : (data) => {
          axios.post('http://localhost:3001/OwnerLogin', data)
              .then((response) => {
                  dispatch({type: 'OwnerLogin',payload : response.data,statusCode : response.status})
          });
      }
  }
}
export default connect(mapStateToProps,mapDispatchStateToProps)(OwnerLogin); 

//export default OwnerLogin;
