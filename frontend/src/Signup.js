import React, { Component } from "react";
import "./App.css";
import Header from "./Header";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import cookie from "react-cookies";
import { connect } from 'react-redux';
class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            firstnameCheck: false,
            lastnameCheck: false,
            emailCheck: false,
            passwordCheck: false,
            authFlag: false,
            mainredirect: false
        };
        this.emailChangeHandler = this.emailChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.firstnameChangeHandler = this.firstnameChangeHandler.bind(this);
        this.lastnameChangeHandler = this.lastnameChangeHandler.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    };

    firstnameChangeHandler = e => {
        this.setState({
            firstname: e.target.value
        });
    };
    //lastname change handler to update state variable with the text entered by the user
    lastnameChangeHandler = e => {
        this.setState({
            lastname: e.target.value
        });
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
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            email: this.state.email,
            password: this.state.password
        };


        this.props.onSubmitHandle(data);
        //set the with credentials to true
        // axios.defaults.withCredentials = true;
        // axios.post("http://localhost:3001/TravellerSignup", data).then(response => {
        //     console.log("Axios POST response:", response.status);

        //     if (response.status === 200) {
        //         alert("signup successfull");
        //         this.setState({ authFlag: true ,
        //             mainredirectVar: <Redirect to="/home" />

        //         });

        //     } else {
        //         console.log("Signup unsuccessful!");
        //         this.setState({ authFlag: false });
        //     }
        // });
    };



    render() {
        return (
            <div>
                <Header></Header>
                <div class="container signup-container">
                    <div class="row">
                        <div class="col order-first">
                        </div>
                        <div class="col">
                            <div class="panel-body">
                                <h2>Sign up for HomeAway</h2>
                                <h4> Already have an account?<Link to="/TravelerLogin">Log in</Link></h4>
                                <form id="register-form" action="" method="post" role="form" >
                                    <div class="form-group">
                                        <input type="text" required name="firstname" id="firstname" tabindex="1" class="form-control" placeholder="FirstName" onChange={this.firstnameChangeHandler} />

                                    </div>
                                    <div class="form-group">
                                        <input type="text" required name="lastname" id="lastname" tabindex="2" class="form-control" placeholder="Last Name" onChange={this.lastnameChangeHandler} />

                                    </div>
                                    <div class="form-group">
                                        <input type="email" required name="email" id="email" tabindex="3" class="form-control" placeholder="Email Address" onChange={this.emailChangeHandler} />

                                    </div>
                                    <div class="form-group">
                                        <input type="password" required name="password" id="password" tabindex="4" class="form-control" placeholder="Password" onChange={this.passwordChangeHandler} />

                                    </div>
                                    <div class="form-group">
                                        <input type="submit" name="signup-submit" id="signup-submit" tabindex="5" class="form-control " onClick={this.handleSubmit} value="Sign Up" />
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div class="col order-last">
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}


const mapStateToProps = state => {
    return {
     
        authFlag: state.authFlag
    }
}


const mapDispatchStateToProps = dispatch => {
    return {
        onSubmitHandle: (data) => {
            axios.post('http://localhost:3001/TravellerSignup', data)
                .then((response) => {
                    dispatch({ type: 'TravellerSignup', payload: response.data, statusCode: response.status })
                    alert("signup successfull");
                });
        }
    }
}


export default connect(mapStateToProps, mapDispatchStateToProps)(Signup);
//export default Signup;