var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PdfSchema = new Schema({
  pdf: String,
  name: String
});

var Pdf = mongoose.model("Pdf", PdfSchema);
module.exports = Pdf;