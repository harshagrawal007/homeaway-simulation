import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import cookie from "react-cookies";
import Header from "./Header";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
//import "styles/login.scss";

class TravelerLogin extends Component {

  constructor(props) {
    //Call the constrictor of Super class i.e The Component
    super(props);
    this.state = {
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
    //var headers = new Headers();
    //prevent page from refresh
    this.props.onSubmitHandle(data);
  };
  render() {
    //redirect based on successful login
    let redirectVar = null;
    //let cookieemail=  cookie.load("travellercookie");
    // if ((cookie.load("travellercookie")))   {
    //   console.log(cookieemail);
    //   redirectVar = <Redirect to="/home" />;
    // }

    if (this.props.authFlag) {
      console.log(this.props.authFlag);
      redirectVar = <Redirect to="/home" />;
    }

    return (
      <div>
        {redirectVar}
        <Header>
        </Header>
        <div className="container signup-container">
          <div className="row">
            <div className="col order-first">
            </div>
            <div className="col">
              <div className="panel-body">
                <h2>Login to HomeAway</h2>
                <p>Need an account?<Link to="/Signup">Sign up</Link></p>
                <form onSubmit={this.handleSubmit}>
                  <h3>Account Login</h3>
                  <div className="form-group">
                    <input
                      autoFocus
                      tabIndex={1}
                      type="email"
                      name="email"
                      placeholder="Email address"
                      className=" form-control"
                      onChange={this.emailChangeHandler}
                    />

                    {this.state.emailCheck ? (
                      <span style={{ color: "red" }}>Cannot login without email</span>
                    ) : (
                        ""
                      )}
                  </div>
                  <div className="form-group">
                    <input
                      tabIndex={2}
                      type="password"
                      name="password"
                      placeholder="Password"
                      required
                      className=" form-control"
                      onChange={this.passwordChangeHandler}
                    />
                  </div>
                  <div className="form-group">
                    <input tabIndex={3} type="submit" className="form-control" name="login" value="Login" onClick={this.handleSubmit} />
                    {this.state.passwordCheck ? (
                      <span style={{ color: "red" }}>Please enter password</span>
                    ) : (
                        ""
                      )}
                  </div>
                </form>
              </div>
            </div>
            <div className="col order-last">
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// const mapDispatchStateToProps = dispatch => {
//   return {
//     onSubmitHandle : (data) => {
//     try {
//       const response = await axios.post('http://localhost:3001/TravelLogin', data);
//       dispatch({type: 'TravelerLogin',payload : response.data,statusCode : response.status});
//     } catch (error) {
//       dispatch({type: 'TravelerLogin',payload : response.data,statusCode : response.status});
//     }
//   }
// }
// }

const mapStateToProps = state => {
  return {
    authFlag: state.authFlag
  }
}



const mapDispatchStateToProps = dispatch => {
  return {
    onSubmitHandle: (data) => {
      axios.post('http://localhost:3001/TravelLogin', data)
        .then((response) => {
          dispatch({ type: 'TravelerLogin', payload: response.data, statusCode: response.status })
        });
    }
  }
}
export default connect(mapStateToProps, mapDispatchStateToProps)(TravelerLogin);
//export default TravelerLogin;
