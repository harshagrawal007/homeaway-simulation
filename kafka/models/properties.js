var mongoose = require('mongoose');
var PropertiesSchema = new mongoose.Schema({
   owneremail: {
        type: String
    },
    country: {
        type: String
    },
    address: {
        type: String
    },
    unit: {
        type: String
    },
    city: {
        type : String
    },
    state: {
        type : String
    },
    postal: {
        type : String
    },
    headline: {
        type : String
    },
    pdescription: {
        type : String
    },
    ptype: {
        type : String
    },
    bedrooms: {
        type : String
    },
    accomodates: {
        type : String
    },
    bathrooms: {
        type : String
    },
    minimumstay: {
        type : String
    },
    baseprice:{
      type : String
    },
    pernight: {
        type : String
    },
    photos:{
        type : String

    }
});


var Properties = mongoose.model('properties', PropertiesSchema);


module.exports = { Properties };