const ProductModel = require("../models/Product.model");

// find data with query
exports.getFilterDataServices = async (query) => {
    const data = await ProductModel.find(query).populate(['menuId', 'categoryId', 'collectionId', 'colorId', 'featureId', 'styleId', 'subCategoryId']);
    return data;
}