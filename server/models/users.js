var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  email: String,
  uid: String,
  createdAt: { type: Date, default: Date.now }
});

var User = mongoose.model("User", UserSchema);
module.exports = User;