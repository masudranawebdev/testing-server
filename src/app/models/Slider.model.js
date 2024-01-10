const mongoose = require("mongoose");

// Slider Schema and connect DB Slider
const sliderSchema = new mongoose.Schema({
    slider: {
        type: String,
        required: true,
    }
},
{
    timestamps: true
})

const SliderModel = mongoose.model("sliders", sliderSchema);

module.exports = SliderModel;