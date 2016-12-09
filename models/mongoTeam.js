
var mongoose    =   require("mongoose");

// create instance of Schema
var teamSchema =  new  mongoose.Schema({
    "teamName" : String,
    "profiles" : Array
});
// create model if not exists.
module.exports = mongoose.model('team',teamSchema);
