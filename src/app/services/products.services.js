const ProductModel = require("../models/Product.model");

// Find All Product
exports.getAllProductService = async (limit, skip) => {
    const getAllProductData = await ProductModel.find({}).sort({ "_id": -1 }).skip(skip).limit(limit).populate(['menuId', 'categoryId', 'collectionId', 'colorId', 'featureId', 'styleId', 'subCategoryId'])
    return getAllProductData;
}

// Find A Product
exports.getAProductService = async (id) => {
    const getAProductData = await ProductModel.find({_id: id});
    return getAProductData;
}

// Add A Product
exports.postProductServices = async (data) => {
    const createProduct = await ProductModel.create(data);
    return createProduct;
}

// Update a Product
exports.updateProductServices = async(data) =>{
    const updateProductInfo = await ProductModel.findOne({_id: data?._id})
    const Product = await ProductModel.updateOne(updateProductInfo, data, {
    runValidators: true });
    return Product;
}

// Delete a Product
exports.deleteProductServices = async (id) => {
    const Product = await ProductModel.deleteOne({ _id: id }, {
        runValidators: true
    });
    return Product;
};
