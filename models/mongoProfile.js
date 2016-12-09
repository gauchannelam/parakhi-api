
var mongoose    =   require("mongoose");

// create instance of Schema
var profileSchema =  new  mongoose.Schema({
    "firstname" : String,
    "lastname"  : String,
    "email"     : String,
    "dob"       : String,
    "job"       : String,
    "address"   : String,
    "description":String,
    "image"      :String

});
// create model if not exists.
module.exports = mongoose.model('profile',profileSchema);
