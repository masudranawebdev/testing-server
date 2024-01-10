const ProductModel = require("../models/Product.model");

// Find All Product
exports.getAllProductService = async () => {
    const getAllProductData = await ProductModel.find({});
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
