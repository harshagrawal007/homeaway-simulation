import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import cookie from "react-cookies";
import Header from "./Header";
import "./App.css";
import { connect } from 'react-redux';
class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: "",
            lastname: "",
            about: "",
            gender: "",
            phone: "",
            company: "",
            languages: "",
            location: ""
        };


        this.firstnameChangeHandler = this.firstnameChangeHandler.bind(this);
        this.lastnameChangeHandler = this.lastnameChangeHandler.bind(this);
        this.aboutChangeHandler = this.aboutChangeHandler.bind(this);
        this.genderChangeHandler = this.genderChangeHandler.bind(this);
        this.phoneChangeHandler = this.phoneChangeHandler.bind(this);
        this.companyChangeHandler = this.companyChangeHandler.bind(this);
        this.languagesChangeHandler = this.languagesChangeHandler.bind(this);
        this.locationChangeHandler = this.locationChangeHandler.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);

    }

    phoneChangeHandler = e => {
        this.setState({
            phone: e.target.value
        });
    };
    aboutChangeHandler = e => {
        this.setState({
            about: e.target.value
        });
    };
    genderChangeHandler = e => {
        this.setState({
            gender: e.target.value
        });
    };

    locationChangeHandler = e => {
        this.setState({
            location: e.target.value
        });
    };
    languagesChangeHandler = e => {
        this.setState({
            languages: e.target.value
        });
    };
    companyChangeHandler = e => {
        this.setState({
            company: e.target.value
        });
    };

    firstnameChangeHandler = e => {
        this.setState({
            firstname: e.target.value
        });
    };

    lastnameChangeHandler = e => {
        this.setState({
            lastname: e.target.value
        });
    };

    componentDidMount() {
       // var email = cookie.load("travellercookie");
        //console.log(email);
        console.log(this.props.email);
       // console.log(this.props.type);
       
        var  id= this.props.email
            
        console.log(id);

        axios.get(`http://localhost:3001/getprofile/${id}`).then(response => {
            //update the state with the response data
            console.log(response.data);
            this.setState({
                firstname: this.state.firstname.concat(response.data.firstname),
                lastname: this.state.lastname.concat(response.data.lastname),
                about: this.state.about.concat(response.data.about),
                gender: this.state.gender.concat(response.data.gender),
                phone: this.state.phone.concat(response.data.phone),
                company: this.state.company.concat(response.data.company),
                languages: this.state.languages.concat(response.data.languages),
                location: this.state.location.concat(response.data.location)
            });
        });
    }

    handleSubmit = e => {
        e.preventDefault();

        const data = {
            email: this.props.email,
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            about: this.state.about,
            gender: this.state.gender,
            phone: this.state.phone,
            company: this.state.company,
            languages: this.state.languages,
            location: this.state.location

        };

        this.props.onSubmitHandle(data);
        //set the with credentials to true
        // axios.defaults.withCredentials = true;
        // axios.post("http://localhost:3001/TravellerUpdate", data).then(response => {
        //     console.log("Axios POST response:", response.status);
        //     if (response.status === 200) {
        //         alert("signup successfull");
        //         this.setState({
        //             authFlag: true,
        //             mainredirectVar: <Redirect to="/home" />
        //         });
        //     } else {
        //         console.log("Signup unsuccessful!");
        //         this.setState({ authFlag: false });
        //     }
        // });
    };

    render() {
        // let redirectVar = null;
        // if (!(cookie.load("travellercookie") || cookie.load("ownercookie"))) {
        //     redirectVar = <Redirect to="/home" />;
        // }
        return (
            <div>
                {/* {redirectVar} */}
                <Header>
                </Header>
                <div className="profile-container">
                    <div className="row">
                        <div className="col-md-3" >
                            <img className="profile-image" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAAM1BMVEUKME7///+El6bw8vQZPVlHZHpmfpHCy9Ojsbzg5ekpSmTR2N44V29XcYayvsd2i5yTpLFbvRYnAAAJcklEQVR4nO2d17arOgxFs+kkofz/154Qmg0uKsuQccddT/vhnOCJLclFMo+//4gedzcApf9B4srrusk+GsqPpj+ypq7zVE9LAdLWWVU+Hx69y2FMwAMGyfusLHwIpooyw9IAQfK+8naDp3OGHvZ0FMhrfPMgVnVjC2kABOQ1MLvi0DEIFj1ILu0LU2WjNRgtSF3pKb4qqtd9IHmjGlJHlc09IHlGcrQcPeUjTAySAGNSkQlRhCCJMGaUC0HSYUx6SmxFAtJDTdylsr4ApC1TY0yquKbCBkk7qnYVzPHFBHkBojhVJWviwgPJrsP4qBgTgbQXdsesjm4pDJDmIuswVZDdFx0ENTtkihoeqSDXD6tVxOFFBHndMKxWvUnzexpIcx/Gg2goJJDhVo6PCMGRAnKTmZuKm3wcJO/upphUqUHy29yVrRhJDORXOKIkEZDf4YiRhEF+iSNCEgb5KY4wSRDkB/yurUEG8nMcocgYABnvbrVL3nMIP0h/d5udKnwzSC/InfPdkJ6eWb0PJE++dyVVyQP5iQmWW27X5QG5druEKafBu0Hqu9saVOHa8HKC/K6BzHKZiRMEZCDF0Nd1/ZfXI/fcOibHOssFgokg9uFA20BhztHEAZIjIohrD/o1wljeFBDEwBo8YUt5Ir/rNLjOIACPFdy/AbEcPdcJBOCxytjeYAM4Kzp6rhOIPhRGNzwmFP3rOoTFI0irtnQKx6fj1Zt+h9njEUS9mKJxfFRrX5lt7wcQtaWTOfTHeIXVJQcQrRW+OYex2j0a66XZINoO8a7fPH2iHF2mC7ZBtB3Czb5QvjizSx7A3308mRzqAwujSywQbYfwc0iU8zqjS0yQ6ztEHX9332KCaGNIYB/Qq1z3yN0oDZBWyeFYJBCkm2sXLhDtpKFwNDMu5TnrZpYGiHbK4Nlwikg5DrYV1g6iPoJmzE5MKd/fOp53EPUaQZaLqH3u+vo2ELWp3wSyWuYGoj9EEIJoV3L9AUS/ZLsJpLNBXmqOu0CW6P5A/dx9IL0FAji/FYKot9EqE0Tvs6QBUe/2CxMEkZAlBNGPhdoAQWyTSmbxUwvUygwQyMmniAPgLt87CODXHuftWJIQgzrfQDC5AfwSgz9MmmG/gWCOqDgZ4JsQeTvZBoJJDhAFEsSDyxUEEUUekk0UEMhjBcEcGsoWVpBU3NcCgkkPkJWrKbdRZvULCMTWhYEdMrayBQRyqHcnSLmAIH7LcWJ8Hch7BsHEdWFpJsZjziCgFBpZ9TPm4e0XBJTTJKt9xjy8RoLI4gimPLP5goCSgWTrEcyzsy8IqmZVMo0H5bJiQToBCOjZ5RcElhjLN3dU7uQMAvoxwQkJZKI1CQzCthJYEigahHuDDi4rFwzCPQ7F1fiDQZgTR5iJwEGYRgIsiECD8BwwMAEfDcIaW8CRBQdhjS1kJQEchDEFhiRKr4KDFPS9FGQNVwEHoW83QjsEHdkfnuIOl6C1NjMItiaCaCWgbdpFJXQ9soh2uoB9aJcCxFdgZwlcrTmvENGlrITBBdpK25Qhd1F2RScq8CKu/gsCL8qN5THjy+Rr5E6joYgPxpdl518QrCf8Kpgjn6C8HLkbb+vt7ZM8wdVvy258khsRfHaS5DalDnlidZT7Erk+SXV5Bj1D3LS29XyhVJuoKHs9Q8S6reK11oUc7vPcr9uswP3SLiDINefXOF5rwCuGzVT6zVkVPfh2wWmHcz4wAwba2cgN1/Tsvleu7//i69CgVyt1GwjOs2+XK3rtbl151Tg3vOeioG40Mz2V+6pQ4xbJHOZj6g0EMxk93tV7fuedvVZpQSPhbwNBGInrymGrwNh1GXmL8F+lAaJ+NU/fzcmvJqvKj7177+1v1GY/GiBKI1Fdy/2XK6upXwaIJpI8B/399W0mH9zzafKaeCF9J0WF+jyCuFusTGzZKhFH8dVLZql2brxgcdVBKb7KG/7UZTmB3XJ6uL/QYT5ScRI74FcHEJ7feopyfGkaeaGlPoCw/BbjZmSBWIvINQNmTxdjWJqwUI8sztR4nYPuIPSTSUnOCZOE3ierqRoJfNSQxDjLEYs8i91eqgFCDSWiFHiuqAN9CwEGCPEISVjvwhS7Mfx6dtX8kC5aqvneGBOEFN2v6RBiYwr3DQOkLhEW6fHFbIwFQnkLiWYmZxE220z/aedPx99C+hiyKR4OzNFhg8S75CJTnxQ1dyugHTLaY10iu9dBpmhQtMz1ABLrkgtHVnRsPUO3OcU25i8cWdGxZbflCBKJqBdMs3aF/dYhNexU9RFcYEmLXYQKghyWdufyldBSU3KpjkKhZclxTXQGCTkL/HZDUIH5+Gkt4SgoCtj7pSYSNJLTK3VVRnmXZxebSMBIzmHABeIdXBebiN9eHYtUZ62ab3BdGkUm+SKJw1bdRXeewaX7qqdAnljg2sVxg3guAk3baofcg9yZ2eZpnHNvSFrEqhB9YPjesmt0pt6Xc8hl7W5L9Q4Xx09ctsrd5VhWeF6nF8SRrZdw49qns//0xTK/AZ8vGr3caTliuzeFNeCJTgafpKlhHd2WP1sy1LqDF798gjKJPLqDr9keoTd43+NyNzC1CI8Xy2lcPtOaVBI5IiAWyQ3e125AcKoXs2Djhy5eVc3KiBxREIPkhjBiLhIjU++4T91IbggjRiCJLSEIwWGddkEaxlVN5KCArPHk8mXVpHk8FHH7JL3n5dPA7C90q7XkeFJucacNmGXeRfswLE71HA79efaGiCN/Ofjmfmtcp8X10tIsqCacV5xfRWjNUiXGYbovWgyFYHcQLak15K9oM5zqmgaeKsHJetbSHfSPzXOiw/rxE9YH4CXaUpsZ0ztemFurP95Jpyvrd29YTpIZr7cEJHqfc7Wl0PFm2+yJR70udaokKFtGPTdm8WdQe24+HmVLlueboWQquBcYYVH2vEzfh8kCks1p90eWsLCyZ8qK7E86Oe+3XYFnBuiWdth20UqZR5SvMoyPg3WNauJipi0LMTQgVq5xUUlZcrPsopPHJ926z8pm7xyFLrH/PxpHSoXKdWgXsLn1scZn1ZDd/2vszN3lt254qkE+qu3yoqLM+ghN3Qz2qcVzUC/ZMFsK/alU6l0OWV/bQz6v6yYbyuN5BaZ4A7Y30vs/PPksS2+qzlvfF7OQmzzcL7W+xa7OIfRuVdtn/tdvdFLnL4OTKcm2W16PmWc4FWWXNSlWM2n3D+uPxuyrcfo74aP+Ac30a82+oLmfAAAAAElFTkSuQmCC" class="rounded-circle" alt="Cinque Terre" />

                        </div>
                        <div className="col-md-8">
                            <div className="panel-body">
                                <h4>Profile</h4>
                                <form className="location-form">
                                    <div className="form-group">
                                        <label>First Name</label>
                                        <input id="firstname" type="text" value={this.state.firstname} onChange={this.firstnameChangeHandler} className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <label>Last Name</label>
                                        <input id="lastname" type="text" value={this.state.lastname} onChange={this.lastnameChangeHandler} className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <label>About Me</label>
                                        <input id="aboutme" type="text" value={this.state.about} onChange={this.aboutChangeHandler} className="form-control" />
                                    </div>

                                    <div className="form-group">
                                        <label>Gender</label>
                                        <input id="gender" type="text" value={this.state.gender} onChange={this.genderChangeHandler} className="form-control" />
                                    </div>

                                    <div className="form-group">
                                        <label>Phone</label>
                                        <input id="phone" type="text" value={this.state.phone} onChange={this.phoneChangeHandler} className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <label>Company</label>
                                        <input id="postal" type="text" value={this.state.company} onChange={this.companyChangeHandler} className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <label>Languages</label>
                                        <input id="language" type="text" value={this.state.languages} onChange={this.languagesChangeHandler} className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <label>Location</label>
                                        <input id="location" type="text" value={this.state.location} onChange={this.locationChangeHandler} className="form-control" />
                                    </div>

                                    <button className="btn btn-primary" onClick={this.handleSubmit}>Save</button>
                                </form>
                            </div>
                        </div>
                        <div className="col-md-1" ></div>
                    </div>
                </div>
            </div>


        );
    }
}

const mapStateToProps = state => {
    return {
        email : state.email,
        authFlag: state.authFlag
    }
}


const mapDispatchStateToProps = dispatch => {
    return {
        onSubmitHandle: (data) => {
            axios.post('http://localhost:3001/TravellerUpdate', data)
                .then((response) => {
                    dispatch({ type: 'TravellerUpdate', payload: response.data, statusCode: response.status })
                });
        }
    }
}




export default connect(mapStateToProps, mapDispatchStateToProps)(Profile);
//export default Profile;