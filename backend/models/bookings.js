var mongoose = require('mongoose');
var BookingsSchema = new mongoose.Schema({
    tid: {
         type: String
     },
     pid: {
         type: String
     },
     arrival: {
         type: Date
     },
     depart: {
         type: Date
     },
     noofguests: {
         type : String
     },
    
 });
 
 
 var Bookings = mongoose.model('bookings', BookingsSchema);
 
 
 module.exports = { Bookings };