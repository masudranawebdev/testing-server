const CategoryModel = require("../models/Category.model");
const ProductModel = require("../models/Product.model");
const Sub_CategoryModel = require("../models/Sub.category.model");

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

// Find All Category to find menu
exports.getAllCategoryServiceMatchMenuId = async (id) => {
    const getAllCategoryData = await CategoryModel.find({menuId: id }).populate('menuId');
    return getAllCategoryData;
}

// Add A Category
exports.postCategoryServices = async (data) => {
    const createCategory = await CategoryModel.create(data);
    return createCategory;
}

// Find A Category is Exist when update ?
exports.checkACategoryExitsInCategoryWhenUpdate = async (category) => {
    const findCategory = await CategoryModel.findOne({ category: category }); 
    return findCategory;
}

// Update a Category
exports.updateCategoryServices = async(data) =>{
    const updateCategoryInfo = await CategoryModel.findOne({_id: data?._id})
    const Category = await CategoryModel.updateOne(updateCategoryInfo, data, {
    runValidators: true });
    return Category;
}

// Find A Category is Exist in a sub category ?
exports.checkACategoryExitsInSubCategory = async (id) => {
    const FindCategory = await Sub_CategoryModel.find({ categoryId: id });
    return FindCategory;
}

// Find A Category is Exist in products ?
exports.checkACategoryExitsInProducts = async (id) => {
    const FindCategory = await ProductModel.find({ categoryId: id });
    return FindCategory;
}

// Delete a Category
exports.deleteCategoryServices = async (id) => {
    const Category = await CategoryModel.deleteOne({ _id: id }, {
        runValidators: true
    });
    return Category;
};
