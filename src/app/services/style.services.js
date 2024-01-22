const ProductModel = require("../models/Product.model");
const StyleModel = require("../models/Style.model");

// Find A Style is Exist ?
exports.checkAStyleExits = async (style) => {
    const FindStyle = await StyleModel.findOne({ style: style });
    return FindStyle;
}

// Find All Style
exports.getAllStyleService = async () => {
    const getAllStyleData = await StyleModel.find({});
    return getAllStyleData;
}

// Add A Style
exports.postStyleServices = async (data) => {
    const createStyle = await StyleModel.create(data);
    return createStyle;
}

// Check A Style when it is Delete exist in products
exports.checkAStyleExitsInProductWhenDelete = async (style) => {
    const checkStyle = await ProductModel.find({styleId: style});
    return checkStyle;
}

// Delete a Style
exports.deleteStyleServices = async (id) => {
    const Style = await StyleModel.deleteOne({ _id: id }, {
        runValidators: true
    });
    return Style;
};

// Check A Style when it is update exist in products
exports.checkAStyleExitsInProductWhenUpdate = async (style) => {
    const checkStyle = await StyleModel.findOne({style: style});
    return checkStyle;
}

// Update a Style
exports.updateStyleServices = async(data) =>{
    const updateStyleInfo = await StyleModel.findOne({_id: data?._id})
    const Style = await StyleModel.updateOne(updateStyleInfo, data, {
    runValidators: true });
    return Style;
}
