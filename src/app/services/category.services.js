const CategoryModel = require("../models/Category.model");

// Find A Category is Exist ?
exports.checkACategoryExits = async (category) => {
    const FindCategory = await CategoryModel.findOne({ category: category });
    return FindCategory;
}

// Find All Category
exports.getAllCategoryService = async () => {
    const getAllCategoryData = await CategoryModel.find({}).populate('menuId');
    return getAllCategoryData;
}

// Add A Category
exports.postCategoryServices = async (data) => {
    const createCategory = await CategoryModel.create(data);
    return createCategory;
}

// Update a Category
exports.updateCategoryServices = async(data) =>{
    const updateCategoryInfo = await CategoryModel.findOne({_id: data?._id})
    const Category = await CategoryModel.updateOne(updateCategoryInfo, data, {
    runValidators: true });
    return Category;
}

// Delete a Category
exports.deleteCategoryServices = async (id) => {
    const Category = await CategoryModel.deleteOne({ _id: id }, {
        runValidators: true
    });
    return Category;
};
