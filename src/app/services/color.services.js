const ColorModel = require("../models/Color.model");

// Find A Color is Exist ?
exports.checkAColorExits = async (color) => {
    const FindColor = await ColorModel.findOne({ color: color });
    return FindColor;
}


// Find All Color
exports.getAllColorService = async () => {
    const FindColor = await ColorModel.find({});
    return FindColor;
}

// Add A Color
exports.postColorServices = async (data) => {
    const createColor = await ColorModel.create(data);
    return createColor;
}

// Delete a color
exports.deleteColorServices = async (id) => {
    const color = await ColorModel.deleteOne({ _id: id }, {
        runValidators: true
    });
    return color;
};
