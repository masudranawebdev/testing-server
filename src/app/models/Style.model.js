const mongoose = require("mongoose");

// Style Schema and connect DB Style
const styleSchema = new mongoose.Schema({
    style: {
        type: String,
        required: true,
    },
},
{
    timestamps: true
})

const StyleModel = mongoose.model("styles", styleSchema);

module.exports = StyleModel;