
var mongoose    =   require("mongoose");
// create instance of Schema
var userSchema =  new  mongoose.Schema({
  "login"      : String,
  "password"   : String,
  "admin"    : Boolean,
  "username"   :{type:String,
                 unique: true},
  "firstname"  : String,
  "lastname"   : String,
  "department" : String,
  "address"    : String,
  "dob"        : String,
  "gender"     : String,
  "phoneNumber": String,
  "email"      : String

});
// create model if not exists.
module.exports = mongoose.model('userLogin',userSchema);
