const ProductModel = require("../models/Product.model");
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

// Find A SubCategory is Exist when update ?
exports.checkASubCategoryExitsInCategoryWhenUpdate = async (sub_category) => {
    const findSubCategory = await Sub_CategoryModel.findOne({ sub_category: sub_category }); 
    return findSubCategory;
}

// Update a Sub_Category
exports.updateSub_CategoryServices = async(data) =>{
    const updateSub_CategoryInfo = await Sub_CategoryModel.findOne({_id: data?._id})
    const Sub_Category = await Sub_CategoryModel.updateOne(updateSub_CategoryInfo, data, {
    runValidators: true });
    return Sub_Category;
}

// Find A SubCategory is Exist in products ?
exports.checkASubCategoryExitsInProducts = async (id) => {
    const FindSubCategory = await ProductModel.find({ sub_categoryId: id });
    return FindSubCategory;
}

// Delete a Sub_Category
exports.deleteSub_CategoryServices = async (id) => {
    const Sub_Category = await Sub_CategoryModel.deleteOne({ _id: id }, {
        runValidators: true
    });
    return Sub_Category;
};
