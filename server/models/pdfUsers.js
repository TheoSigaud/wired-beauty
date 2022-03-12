var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PdfUsersSchema = new Schema({
  email: String,
  name: String
});

var PdfUsers = mongoose.model("PdfUsers", PdfUsersSchema);
module.exports = PdfUsers;