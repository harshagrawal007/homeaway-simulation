const express = require("express");
const app = express();
const bodyParser = require("body-parser");
//var passport = require('passport');
var config = require('./config/main');
var jwt = require('jsonwebtoken');
var mongoose = require('express');
var kafka = require('./kafka/client');

const session = require("express-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const pool = require("./pool");
const mysql = require("mysql");
const fs = require("fs");
const multer = require("multer");
const uuidv4 = require("uuid/v4");
const path = require("path");

app.set("view engine", "ejs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    const newFilename = `${uuidv4()}${path.extname(file.originalname)}`;
    console.log(newFilename);
    cb(null, newFilename);
  }
});
const upload = multer({ storage });

app.use(
  session({
    secret: "cmpe273_kafka_passport_mongo",
    resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration: 60 * 60 * 1000, // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration: 5 * 60 * 1000
  })
);

app.use(bodyParser.json());
//app.use(morgan('dev'));

var mongoose = require('mongoose');
//require('./config/passport')(passport);

var { Users } = require('./models/users');

var { Properties } = require('./models/properties');

var { Bookings } = require('./models/bookings');

// Create API group routes
//var apiRoutes = express.Router();

mongoose.connect(config.database);

mongoose.Promise = global.Promise;
console.log(mongoose.connection.readyState);
var connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'connection error'));
connection.once('open', function callback() {
  console.log('connected');                 //result : connected
});

//Allow Access Control
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

//app.use("/UploadImage", require('./routes/upload'))

app.post("/", upload.single("Propertyimages"), (req, res) => {
  console.log("Request ---", req.body);
  console.log("Request file ---", req.file);//Here you get file.
  if (!req.file) {
    console.log("No file received");
    res.send({
      success: false
    });
  } else {
    console.log("File received!", req.file);
    file_name = res.req.file.filename
    console.log("File uploaded: " + file_name)
    res.end(file_name)

  }
});

console.log("before post call" + mongoose.connection.readyState);
app.post('/TravelLogin', function (req, res) {
  var username = req.body.email;
  var password = req.body.password;
  console.log("Username:", username + " password:", password);

  Users.findOne({
    username: req.body.email,
    type: "traveller"
  }, function (err, user) {
    console.log(user);
    if (user != null) {
      console.log("record found");
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          // Create token if the password matched and no error was thrown
          var token = jwt.sign(user.toJSON(), config.secret, {
            expiresIn: 10080 // in seconds
          });

          console.log("Login successful");
          res.cookie('travellercookie', req.body.email, { maxAge: 900000, httpOnly: false, path: '/' });
          res.code = "200";
          res.value = user;
          req.session.email = req.body.email;
          res.writeHead(200, {
            "Content-Type": "text/plain"
          });

          const data = {
            authFlag: true,
            email: req.body.email,
            type: "traveller",
            token: 'JWT ' + token

          }
          console.log(data);
          res.end(JSON.stringify(data));
        }
        else if (err) {
          //console.log("error"+ err);
          res.code = "400";
          res.value = "The email and password you entered did not match our records. Please double-check and try again.";
          console.log(res.value);
          const resData = {
            authFlag: false,
          }
          res.end(JSON.stringify(resData));
        } else {
          res.send({ success: false, message: 'Authentication failed. Passwords did not match.' });
        }
      });
    }
  });
});


console.log("before post call" + mongoose.connection.readyState);
app.post('/OwnerLogin', function (req, res) {
  var username = req.body.email;
  var password = req.body.password;
  console.log("Username:", username + " password:", password);

  Users.findOne({
    username: req.body.email,
    type: "owner"
  }, function (err, user) {
    console.log(user);
    if (user != null) {
      console.log("record found");
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          // Create token if the password matched and no error was thrown
          var token = jwt.sign(user.toJSON(), config.secret, {
            expiresIn: 10080 // in seconds
          });

          console.log("Login successful");
          res.cookie('ownercookie', req.body.email, { maxAge: 900000, httpOnly: false, path: '/' });
          res.code = "200";
          res.value = user;
          req.session.email = req.body.email;
          res.writeHead(200, {
            "Content-Type": "text/plain"
          });

          const resData = {
            authFlag: true,
            email: req.body.email,
            type: "owner",
            token: token

          }
          console.log(resData);
          res.end(JSON.stringify(resData));
        } else if (err) {
          //console.log("error"+ err);

          res.code = "400";
          res.value = "The email and password you entered did not match our records. Please double-check and try again.";
          console.log(res.value);
          const resData = {
            authFlag: false,
          }
          res.end(JSON.stringify(resData));
        }
        else {
          res.send({ success: false, message: 'Authentication failed. Passwords did not match.' });
        }
      });
    }
  });
});


app.post('/TravellerSignup', function (req, res) {
  console.log("Inside Traveller Signup Request");
  console.log(req.body);
  //let password = req.body.password;
  //let hash = bcrypt.hashSync(password, 10);
  var user = new Users({
    username: req.body.email,
    type: "traveller",
    lastname: req.body.lastname,
    firstname: req.body.firstname,
    password: req.body.password
  });

  // save model to database
  user.save(function (err, user) {
    if (err) {
      res.code = "400";
      res.value = "Coudnt save user ";
      res.end(JSON.stringify(resData));
    } else {
      res.code = "200";
      res.value = user;
      res.writeHead(200, {
        "Content-Type": "text/plain"
      });
      res.end(JSON.stringify(user));
    }
    console.log(user.username + " saved to users collection.");
  });
});



app.post('/OwnerSignup', function (req, res) {
  console.log("Inside Owner Signup Request");
  console.log(req.body);
  //let password = req.body.password;
  //let hash = bcrypt.hashSync(password, 10);
  var user = new Users({
    username: req.body.email,
    type: "owner",
    lastname: req.body.lastname,
    firstname: req.body.firstname,
    password: req.body.password
  });

  // save model to database
  user.save(function (err, user) {
    if (err) {
      res.code = "400";
      res.value = "Coudnt save user ";
      res.end(JSON.stringify(resData));
    } else {
      res.code = "200";
      res.value = user;
      res.writeHead(200, {
        "Content-Type": "text/plain"
      });
      res.end(JSON.stringify(user));
    }
    console.log(user.username + " saved to users collection.");
  });
});


app.post('/TravellerUpdate', function (req, res) {
  console.log("Inside Traveller update Request");
  console.log(req.body);
  //let password = req.body.password;
  //let hash = bcrypt.hashSync(password, 10);
  Users.updateOne({ username: req.body.email }, {
    lastname: req.body.lastname,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    about: req.body.about,
    gender: req.body.gender,
    phone: req.body.phone,
    company: req.body.company,
    languages: req.body.languages,
    location: req.body.location
  }, function (err, user, rawresponse) {
    if (err) {
      res.code = "400";
      res.value = "Coudnt update user ";
      res.end(JSON.stringify(resData));
    } else {
      res.code = "200";
      console.log(user);
      console.log(rawresponse);
      res.value = user;
      res.writeHead(200, {
        "Content-Type": "text/plain"
      });
      const data = {
        authFlag: true
      }
      res.end(JSON.stringify(data));
    }
    console.log(user.username + " user updated in  collection.");
  });

});


app.get('/getprofile/:id', function (req, res) {
  console.log("profile to get ", req.params.id)
  console.log(req.params);
  Users.findOne({
    username: req.params.id,
  }, function (err, user) {
    console.log(user);
    if (user) {
      console.log("record found");
    }
    if (err) {
      //console.log("error"+ err);
      res.code = "400";
      res.value = "The email you entered did not match our records. Please double-check and try again.";
      console.log(res.value);
    } else {
      res.code = "200";
      res.value = user;
      req.session.email = req.body.email;
      res.writeHead(200, {
        "Content-Type": "text/plain"
      });
      res.user = user;
      res.end(JSON.stringify(user));
    }
  });
});

app.get('/ownerdash/:email', function (req, res) {
  console.log("profile to get ", req.params.email)
  console.log(req.params);
  Properties.find({
    owneremail: req.params.email,
  }, function (err, user) {
    console.log(properties);
    if (properties) {
      console.log("properties found ");
    }
    if (err) {
      //console.log("error"+ err);
      res.code = "400";
      res.value = "The email you entered did not match our records. Please double-check and try again.";
      console.log(res.value);
    } else {
      res.code = "200";
      res.value = user;
      req.session.email = req.body.email;
      res.writeHead(200, {
        "Content-Type": "text/plain"
      });
      res.properties = properties;
      res.end(JSON.stringify(properties));
    }
  });
});

app.post('/AddProperty', function (req, res) {

  kafka.make_request('postproperty', req.body, function (err, results) {
    if (err) {
      res.code = "400";
      res.value = "Coudnt save property ";
    } else {
      res.code = "200";
      res.value = results;
      res.writeHead(200, {
        "Content-Type": "text/plain"
      });
      res.end(JSON.stringify(results));
    }

  });
});


// app.post('/AddProperty', function (req, res) {
//   console.log("Inside addproperty  Request");
//   console.log("request " + req.body);
//   //let password = req.body.password;
//   //let hash = bcrypt.hashSync(password, 10);
//   var property = new Properties({

//     owneremail: req.body.owneremail,
//     country: req.body.country,
//     address: req.body.address,
//     unit: req.body.unit,
//     city: req.body.city,
//     state: req.body.state,
//     postal: req.body.postal,
//     headline: req.body.headline,
//     pdescription: req.body.pdescription,
//     ptype: req.body.ptype,
//     bedrooms: req.body.bedrooms,
//     accomodates: req.body.accomodates,
//     bathrooms: req.body.bathrooms,
//     minimumstay: req.body.minimumstay,
//     baseprice: req.body.baseprice,
//     pernight: req.body.pernight,
//     photos: req.body.photos
//   });

// save model to database
//   property.save(function (err, property) {
//     if (err) {
//       res.code = "400";
//       res.value = "Coudnt save property ";
//       res.end(JSON.stringify(resData));
//     } else {
//       res.code = "200";
//       res.value = property;
//       res.writeHead(200, {
//         "Content-Type": "text/plain"
//       });
//       res.end(JSON.stringify(property));
//     }
//     console.log(property + " saved to property collection.");
//   });
// });



//start your server on port 3001
app.listen(3001);
console.log("Server Listening on port 3001");

/*app.get("/home", function(req, res) {
  var sql = "SELECT * FROM property";
  pool.getConnection(function(err, con) {
    if (err) {
      res.writeHead(400, {
        "Content-Type": "text/plain"
      });
      res.end("Could Not Get Connection Object");
    } else {
      con.query(sql, function(err, result) {
        if (err) {
          res.writeHead(400, {
            "Content-Type": "text/plain"
          });
          res.end("Could Not Get Connection Object");
        } else {
          res.writeHead(200, {
            "Content-Type": "application/json"
          });
          res.end(JSON.stringify(result));
        }
      });
    }
  });
});
*/