var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var StorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    }
});

var Story = mongoose.model("Story", StorySchema);
module.exports = Story;