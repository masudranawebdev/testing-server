const ColorModel = require("../models/Color.model");
const ProductModel = require("../models/Product.model");

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

// Find A Color is Exist in a product ?
exports.checkAColorExitsInProduct = async (color) => {
    const FindColor = await ProductModel.findOne({ colorId: color });
    return FindColor;
}

// Delete a color
exports.deleteColorServices = async (id) => {
    const color = await ColorModel.deleteOne({ _id: id }, {
        runValidators: true
    });
    return color;
};

// Check A Color when it is update exist in products
exports.checkAColorExitsInProductWhenUpdate = async (color) => {
    const checkColor = await ColorModel.find({color: color});
    return checkColor;
}

// Update a Color
exports.updateColorServices = async(data) =>{
    const updateColorInfo = await ColorModel.findOne({_id: data?._id})
    const Color = await ColorModel.updateOne(updateColorInfo, data, {
    runValidators: true });
    return Color;
}
