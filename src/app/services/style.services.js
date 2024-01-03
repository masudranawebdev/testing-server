
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

// Update a Style
exports.updateStyleServices = async(data) =>{
    const updateStyleInfo = await StyleModel.findOne({_id: data?._id})
    const Style = await StyleModel.updateOne(updateStyleInfo, data, {
    runValidators: true });
    return Style;
}

// Delete a Style
exports.deleteStyleServices = async (id) => {
    const Style = await StyleModel.deleteOne({ _id: id }, {
        runValidators: true
    });
    return Style;
};
