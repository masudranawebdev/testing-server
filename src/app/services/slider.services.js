const SliderModel = require("../models/Slider.model");

// Find All Slider
exports.getAllSliderService = async () => {
    const getAllSliderData = await SliderModel.find({});
    return getAllSliderData;
}

// Add A Slider
exports.postSliderServices = async (data) => {
    const createSlider = await SliderModel.create(data);
    return createSlider;
}

// Update a Slider
exports.updateSliderServices = async(data) =>{
    const updateSliderInfo = await SliderModel.findOne({_id: data?._id})
    const Slider = await SliderModel.updateOne(updateSliderInfo, data, {
    runValidators: true });
    return Slider;
}

// Delete a Slider
exports.deleteSliderServices = async (id) => {
    const Slider = await SliderModel.deleteOne({ _id: id }, {
        runValidators: true
    });
    return Slider;
};
