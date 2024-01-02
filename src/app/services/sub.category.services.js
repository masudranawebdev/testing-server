const Sub_CategoryModel = require("../models/Sub.category.model");

// Find A Sub_Category is Exist ?
exports.checkASub_CategoryExits = async (sub_category) => {
    const FindSub_Category = await Sub_CategoryModel.findOne({ sub_category: sub_category });
    return FindSub_Category;
}

// Find All Sub_Category
exports.getAllSub_CategoryService = async () => {
    const getAllSub_CategoryData = await Sub_CategoryModel.find({}).populate(['menuId', 'categoryId']);
    return getAllSub_CategoryData;
}

// Add A Sub_Category
exports.postSub_CategoryServices = async (data) => {
    const createSub_Category = await Sub_CategoryModel.create(data);
    return createSub_Category;
}

// Update a Sub_Category
exports.updateSub_CategoryServices = async(data) =>{
    const updateSub_CategoryInfo = await Sub_CategoryModel.findOne({_id: data?._id})
    const Sub_Category = await Sub_CategoryModel.updateOne(updateSub_CategoryInfo, data, {
    runValidators: true });
    return Sub_Category;
}

// Delete a Sub_Category
exports.deleteSub_CategoryServices = async (id) => {
    const Sub_Category = await Sub_CategoryModel.deleteOne({ _id: id }, {
        runValidators: true
    });
    return Sub_Category;
};
