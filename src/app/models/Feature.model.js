const mongoose = require("mongoose");

// Feature Schema and connect DB Feature
const featureSchema = new mongoose.Schema({
    feature: {
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

const FeatureModel = mongoose.model("features", featureSchema);

module.exports = FeatureModel;