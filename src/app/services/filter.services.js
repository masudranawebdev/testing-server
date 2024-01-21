const ProductModel = require("../models/Product.model");

// find data with query
exports.getFilterDataServices = async (query) => {

    const keyword = query.title; // Assuming 'title' is part of the query
    const titleRegex = new RegExp(keyword, 'i');


    const allData = await ProductModel.find({}).populate(['menuId', 'categoryId', 'collectionId', 'colorId', 'featureId', 'styleId', 'subCategoryId']);

const data = allData.filter(item => {
    return (
        (!query.menuId || item.menuId.slug === query.menuId) &&
        (!query.categoryId || item.categoryId.slug === query.categoryId) &&
        (!query.subCategoryId || item.subCategoryId.slug === query.subCategoryId) &&
        (!query.collectionId || item.collectionId.slug === query.collectionId) &&
        (!query.styleId || item.styleId.slug === query.styleId) &&
        (!query.featureId || item.featureId.slug === query.featureId) &&
        (!query.colorId || item.colorId.slug === query.colorId) &&
        (!query.title || titleRegex.test(item.title))
    );
});

return data;

}