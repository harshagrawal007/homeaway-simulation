//var mongo = require('./mongo');
//var bcrypt = require('bcrypt');
var config = {
    'secret': 'topsecret',
    'database':'mongodb://harshagrawal007:qazwsx0097@ds037758.mlab.com:37758/harshhomeaway'
    //'database' :'mongodb://127.0.0.1:27017/homeaway'
};
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
//var { Properties } = require('./models/properties');

mongoose.connect(config.database);

mongoose.Promise = global.Promise;
console.log(mongoose.connection.readyState);
var connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'connection error'));
connection.once('open', function callback() {
    console.log('connected');                
     //result : connected
});


function handle_request(msg, callback) {
    
    console.log("In handle request:" + JSON.stringify(msg));

    console.log('Connected to mongodb');
    var property = new Properties({

        owneremail: msg.owneremail,
        country: msg.country,
        address: msg.address,
        unit: msg.unit,
        city: msg.city,
        state: msg.state,
        postal: msg.postal,
        headline: msg.headline,
        pdescription: msg.pdescription,
        ptype: msg.ptype,
        bedrooms: msg.bedrooms,
        accomodates: msg.accomodates,
        bathrooms: msg.bathrooms,
        minimumstay: msg.minimumstay,
        baseprice: msg.baseprice,
        pernight: msg.pernight,
        photos: msg.photos
    });

    property.save(function (err, property) {
        if (err) {
            console.log("inside kafka error");
            callback(err, "Error");
        } else {
            console.log("inside kafka no error");
            callback(null, property);
        }
        console.log(property + " saved to property collection.");
    });

}


exports.handle_request = handle_request;