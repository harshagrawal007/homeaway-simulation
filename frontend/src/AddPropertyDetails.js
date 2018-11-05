import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import Dropzone from "react-dropzone";
import cookie from "react-cookies";
import Header from "./Header";
import { connect } from 'react-redux';

class AddPropertyDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
      owneremail: "",
      Country: "",
      Address: "",
      Unit: "",
      City: "",
      State: "",
      Postal: "",
      Headline: "",
      Pdescription: "",
      Ptype: "",
      Bedrooms: "",
      Accomodates: "",
      Bathrooms: "",
      Minimumstay: "",
      Baseprice: "",
      Pernight: "",
      photos:""
    };
    this.countryChangeHandler = this.countryChangeHandler.bind(this);
    this.addressChangeHandler = this.addressChangeHandler.bind(this);
    this.cityChangeHandler = this.cityChangeHandler.bind(this);
    this.stateChangeHandler = this.stateChangeHandler.bind(this);
    this.postalChangeHandler = this.postalChangeHandler.bind(this);
    this.unitChangeHandler = this.unitChangeHandler.bind(this);

    this.pernightChangeHandler = this.pernightChangeHandler.bind(this);
    this.basepriceChangeHandler = this.basepriceChangeHandler.bind(this);
    this.minimumstayChangeHandler = this.minimumstayChangeHandler.bind(this);
    this.bathroomsChangeHandler = this.bathroomsChangeHandler.bind(this);
    this.accomodatesChangeHandler = this.accomodatesChangeHandler.bind(this);
    this.bedroomsChangeHandler = this.bedroomsChangeHandler.bind(this);
    this.ptypeChangeHandler = this.ptypeChangeHandler.bind(this);
    this.pdescriptionChangeHandler = this.pdescriptionChangeHandler.bind(this);
    this.headlineChangeHandler = this.headlineChangeHandler.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  bathroomsChangeHandler = e => {
    this.setState({
      Bathrooms: e.target.value
    });
  };

  accomodatesChangeHandler = e => {
    this.setState({
      Accomodates: e.target.value
    });
  };

  pernightChangeHandler = e => {
    this.setState({
      Pernight: e.target.value
    });
  };

  basepriceChangeHandler = e => {
    this.setState({
      Baseprice: e.target.value
    });
  };

  minimumstayChangeHandler = e => {
    this.setState({
      Minimumstay: e.target.value
    });
  };

  bedroomsChangeHandler = e => {
    this.setState({
      Bedrooms: e.target.value
    });
  };

  ptypeChangeHandler = e => {
    this.setState({
      Ptype: e.target.value
    });
  };

  pdescriptionChangeHandler = e => {
    this.setState({
      Pdescription: e.target.value
    });
  };

  headlineChangeHandler = e => {
    this.setState({
      Headline: e.target.value
    });
  };

  countryChangeHandler = e => {
    this.setState({
      Country: e.target.value
    });
  };

  addressChangeHandler = e => {
    this.setState({
      Address: e.target.value
    });
  };
  cityChangeHandler = e => {
    this.setState({
      City: e.target.value
    });
  };
  unitChangeHandler = e => {
    this.setState({
      Unit: e.target.value
    });
  };
  postalChangeHandler = e => {
    this.setState({
      Postal: e.target.value
    });
  };
  stateChangeHandler = e => {
    this.setState({
      State: e.target.value
    });
  };

  handleOnDrop = (files) => {
    console.log("inside handleondrop");
    const len = files.length
    var imgArrayFrontUploaded = []
    var uploadedImgNames = ""
    for (let size = 0; size < len; size++) {
      imgArrayFrontUploaded.push(files[size])
    }
    for (let size = 0; size < len; size++) {
      let image = imgArrayFrontUploaded[size];
      let file = new FormData();
      file.append("Propertyimages", image);
      console.log("before post call");
      axios.post("http://localhost:3001/", file).then(response => {
        console.log(response.data);
        if (uploadedImgNames === "") {
          console.log("before"+uploadedImgNames);
          uploadedImgNames = response.data
          console.log("after"+uploadedImgNames);
        }
        else {
          console.log("before"+uploadedImgNames);
          uploadedImgNames = uploadedImgNames + ',' + response.data
          console.log("after"+uploadedImgNames);
        }
        // alert("The file is successfully uploaded");

        // console.log("File uploaded successfuly");
      });
    }
    this.setState({
      photos : JSON.stringify(uploadedImgNames)
    });
    console.log("in state"+this.state.photos);
   
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log("ownwer email"+this.props.email);

    const data = {
     
      owneremail: this.props.email,
      country: this.state.Country,
      address: this.state.Address,
      unit: this.state.Unit,
      city: this.state.City,
      state: this.state.State,
      postal: this.state.Postal,
      headline: this.state.Headline,
      pdescription: this.state.Pdescription,
      ptype: this.state.Ptype,
      bedrooms: this.state.Bedrooms,
      accomodates: this.state.Accomodates,
      bathrooms: this.state.Bathrooms,
      minimumstay: this.state.Minimumstay,
      baseprice: this.state.Baseprice,
      pernight: this.state.Pernight,
      photos: this.state.photos,

    };

    console.log(data);

    this.props.onSubmitHandle(data);
   
  };
  render() {
    let redirectVar = null;
console.log("inisde render"+ this.props.email);
console.log("inisde render"+ this.props.owneremail);
console.log("inisde render"+ this.props.authFlag);
  
    if(!this.props.authFlag){
      redirectVar = <Redirect to="/OwnerSignup" />;
    }
     else if(localStorage.getItem('type') === "traveller")
      {
        redirectVar = <Redirect to="/OwnerSignup" />;
      }
      

    return (
      <div>
        {redirectVar}
        <Header>
        </Header>

        <div className="owner-container">

          <div className="row">
            <div className="col col-md-1 ">
              <ul className="nav nav-pills nav-stacked">
                <li className="active"  >
                  <a data-toggle="tab" href="#location">Location</a>
                </li>
                <li >
                  <a data-toggle="tab" href="#details">Details</a>
                </li>
                <li  >
                  <a data-toggle="tab" href="#photos"> Photos</a>
                </li>
                <li >
                  <a data-toggle="tab" href="#pricing"> Pricing</a>
                </li>

              </ul>
            </div>
            <div className="col">
              <div className="container">
                <div className="tab-content">
                  <div id="location" className="tab-pane fade in active">
                    <div className="panel-body">
                      <h2>Location</h2>
                      <form className="location-form">
                        <div className="form-group">
                          <label>Country</label>
                          <input id="country" type="text" value={this.state.Country} onChange={this.countryChangeHandler} className="form-control" />
                        </div>
                        <div className="form-group">
                          <label>Street Address</label>
                          <input id="address" type="text" value={this.state.Address} onChange={this.addressChangeHandler} className="form-control" />
                        </div>
                        <div className="form-group">
                          <label>Unit, Suite, Building, Etc.</label>
                          <input id="unit" type="text" value={this.state.Unit} onChange={this.unitChangeHandler} className="form-control" />
                        </div>

                        <div className="form-group">
                          <label>City</label>
                          <input id="city" type="text" value={this.state.City} onChange={this.cityChangeHandler} className="form-control" />
                        </div>

                        <div className="form-group">
                          <label>State</label>
                          <input id="state" type="text" value={this.state.State} onChange={this.stateChangeHandler} className="form-control" />
                        </div>

                        <div className="form-group">
                          <label>Postal Code</label>
                          <input id="postal" type="text" value={this.state.Postal} onChange={this.postalChangeHandler} className="form-control" />
                        </div>
                      </form>
                    </div>
                  </div>

                  <div id="details" className="tab-pane fade">
                    <div className="panel panel-default">
                      <div className="panel-body">
                        <h2>Describe your property</h2>
                        <hr />
                        <form className="details-form">
                          <div className="form-group">
                            <label>Headline</label>
                            <input id="headline" type="text" value={this.state.Headline} onChange={this.headlineChangeHandler} className="form-control" />
                          </div>
                          <div className="form-group">
                            <label>Property description</label>
                            <input id="pdescription" value={this.state.Pdescription} onChange={this.pdescriptionChangeHandler} type="text" className="form-control" />
                          </div>
                          <div className="form-group">
                            <label>Property type</label>
                            <input id="ptype" value={this.state.Ptype} onChange={this.ptypeChangeHandler} type="text" className="form-control" />
                          </div>

                          <div className="form-group">
                            <label>Bedrooms</label>
                            <input id="bedrooms" value={this.state.Bedrooms} onChange={this.bedroomsChangeHandler} type="text" className="form-control" />
                          </div>

                          <div className="form-group">
                            <label>Accomodates</label>
                            <input id="accomodates" value={this.state.Accomodates} onChange={this.accomodatesChangeHandler} type="text" className="form-control" />
                          </div>

                          <div className="form-group">
                            <label>Bathrooms</label>
                            <input id="bathrooms" value={this.state.Bathrooms} onChange={this.bathroomsChangeHandler} type="text" className="form-control" />
                          </div>

                        </form>
                      </div>
                    </div>
                  </div>
                  <div id="pricing" className="tab-pane fade">
                    <div className="panel panel-default">
                      <div className="panel-body">
                        <h2>Pricing</h2>
                        <form className="details-form">
                          <div className="form-group">
                            <label>Minimum Stay</label>
                            <input id="headline" value={this.state.Minimumstay} onChange={this.minimumstayChangeHandler} type="text" className="form-control" />
                          </div>
                          <div className="form-group">
                            <label>Base Price</label>
                            <input id="pdescription" value={this.state.Baseprice} onChange={this.basepriceChangeHandler} type="text" className="form-control" />
                          </div>
                          <div className="form-group">
                            <label>Per Night</label>
                            <input id="ptype" type="text" value={this.state.Pernight} onChange={this.pernightChangeHandler} className="form-control" />
                          </div>
                          <hr />
                          <button className="btn btn-primary">Cancel</button>
                          <button className="btn btn-primary" onClick={this.handleSubmit}>Save</button>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div id="photos" className="tab-pane fade">
                    <div className="layout">
                      <div className="panel panel-default">
                        <h2>Add up to 50 photos of your property</h2>
                        <hr />
                        <div>
                          <Dropzone onDrop={this.handleOnDrop}>
                            Drop your images here
                        </Dropzone>
                          Showcase your property’s best features (no pets or people, please).
                          Requirements: JPEG, at least 1920 x 1080 pixels, less than 20MB file
                          size, 6 photos minimum.
                      </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div >
        </div >
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
      axios.post('http://localhost:3001/AddProperty', data)
        .then((response) => {
          dispatch({ type: 'AddProperty', payload: response.data, statusCode: response.status })
          alert("property posted");
        });
    }
  }
}
export default connect(mapStateToProps, mapDispatchStateToProps)(AddPropertyDetails);

//export default AddPropertyDetails;