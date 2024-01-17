const ProductModel = require("../models/Product.model");

// find data with query
exports.getFilterDataServices = async (query) => {
    const data = await ProductModel.find(query);
    return data;
}