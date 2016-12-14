var mongoose    =   require("mongoose");
// create instance of Schema
var leaveSchema =  new  mongoose.Schema({
  "name"  : String,
  "department" : String,
  "reason" : String,
  "date" :String,
  "days" : String,
  "userId" : String

});
// create model if not exists.
module.exports = mongoose.model('leaveReq',leaveSchema);
