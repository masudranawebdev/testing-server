const mongoose = require("mongoose");

// Color Schema and connect DB collection
const colorSchema = new mongoose.Schema({
    color: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true
    }
},
{
    timestamps: true
})

const ColorModel = mongoose.model("colors", colorSchema);

module.exports = ColorModel;