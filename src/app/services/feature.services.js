const FeatureModel = require("../models/Feature.model");

// Find A Feature is Exist ?
exports.checkAFeatureExits = async (feature) => {
    const FindFeature = await FeatureModel.findOne({ feature: feature });
    return FindFeature;
}

// Find All Feature
exports.getAllFeatureService = async () => {
    const getAllFeatureData = await FeatureModel.find({});
    return getAllFeatureData;
}

// Add A Feature
exports.postFeatureServices = async (data) => {
    const createFeature = await FeatureModel.create(data);
    return createFeature;
}

// Delete a Feature
exports.deleteFeatureServices = async (id) => {
    const Feature = await FeatureModel.deleteOne({ _id: id }, {
        runValidators: true
    });
    return Feature;
};
