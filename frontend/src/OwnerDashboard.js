import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import { Redirect } from 'react-router';
import Header from "./Header";

class OwnerDashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            rows: [{}],
            isLoading: true
        }

    }

    componentDidMount() {

        var email = this.props.email

        axios.get(`http://localhost:3001/ownerdash/${email}`).then(response => {
            console.log("Status Code : ", response.data);
            if (response.status === 200) {
                this.setState({
                    rows: response.data,
                    isLoading: false,
                    name: user
                })
            }
            console.log(this.state.rows)
        });

        /* axios.post('http://localhost:3001/bookinginfo', data)
           .then(response => {
             console.log("Status Code : ",response.status);
             if(response.status === 200){
                 self.setState ({
                     rows : response.data,
                     isLoading : false,
                     name : user
                 })
             }
             console.log(this.state.rows)
         }); */

    }

    datecorrection = (date) => {
        var temp = JSON.stringify(date)
        temp = temp.split("T")[0]
        temp = temp.replace(/-/g, '/');
        temp = temp.substr(1);
        return temp;
    }

    getContents() {
        const { rows } = this.state;
        const { isLoading } = this.state;

        if (!isLoading) {
            return Object.keys(rows).map(function (i) {
                return <div className="brdr bgc-fff pad-10 box-shad btm-mrg-20 property-listing border1 zoom" style={{ width: "880px" }} key={rows[i].ID}>
                    <div className="media">

                    {/* <img alt="image" className="img-responsive" src={`http://localhost:3001/uploads/${rows[i].FileName1}`} style={{ height: "200px", width: "300px" }} /> */}


                        <div className="clearfix visible-sm border1"> </div>
                        <div className="media-body">
                            <h4 className="media-heading">{rows[i].headline}</h4>
                            <h6>{rows[i].Description}></h6>

                            <ul className="list-inline">
                                <li className="list-inline-item"><img src="map.jpg" /></li>
                                <li className="list-inline-item"> {rows[i].unit} {rows[i].address} {rows[i].city} {rows[i].state} {rows[i].country}</li>
                            </ul>

                            <ul className="list-inline">
                                <li className="list-inline-item">{rows[i].ptype}</li>
                                <li className="list-inline-item dot"> </li>
                                <li className="list-inline-item"> {rows[i].bedrooms} BR</li>
                                <li className="list-inline-item dot"> </li>
                                <li className="list-inline-item"> {rows[i].bathrooms} BA</li>
                                <li className="list-inline-item dot"></li>
                                <li className="list-inline-item"> Sleeps     {rows[i].accomodates}</li>
                            </ul>

                        </div>
                    </div>

                </div>
            });
        }
    }

    render() {
        let redirectVar = null;
        if (!(this.props.authFlag)) {
            redirectVar = <Redirect to="/home" />
        }
        return (
            <div>
                {redirectVar}
                <Header>
                </Header>
                <div className="container">
                    <div className="container-pad">
                        <div className="form-row ">
                            <div className="form-group col-sm-8" id="property-listings">
                                {this.getContents()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
//export Home Component
export default OwnerDashboard;
