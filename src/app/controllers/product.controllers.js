const httpStatus = require("http-status");
const sendResponse = require("../../shared/send.response");
const ApiError = require("../../errors/ApiError");
const { getAllProductService, postProductServices, updateProductServices, deleteProductServices, getAProductService, getSearchProductService } = require("../services/products.services");
const ProductModel = require("../models/Product.model");

// get all Product
exports.getAllProduct = async (req, res, next) => {
    try {
        const {page, limit} = req.query;
        const pageNumber = Number(page);
        const limitNumber = Number(limit);
        const skip = (pageNumber - 1) * limitNumber;
        const result = await getAllProductService(limitNumber, skip);
        const total = await ProductModel.countDocuments();
        if(result){
            return sendResponse(res, {
                statusCode: httpStatus.OK,
                success: true,
                message: 'Product Found successfully !',
                data: result,
                totalData: total
            });
        }
        throw new ApiError(400, 'Product Found Failed !')
    } catch (error) {
        next(error)
    }
}

// get a Product
exports.getAProduct = async (req, res, next) => {
    try {
        const slug = req.params.slug;
        const result = await getAProductService(slug);
        if(result){
            return sendResponse(res, {
                statusCode: httpStatus.OK,
                success: true,
                message: 'Product Found successfully !',
                data: result,
            });
        }
        throw new ApiError(400, 'Product Found Failed !')
    } catch (error) {
        next(error)
    }
}

// post a Product
exports.postProduct = async (req, res, next) => {
    try {
        const data = req.body;
        const result = await postProductServices(data);
        if(result){
            return sendResponse(res, {
                statusCode: httpStatus.OK,
                success: true,
                message: 'Product Added successfully !',
                data: result,
            });
        }
        throw new ApiError(400, 'Product Added Failed !')
    } catch (error) {
        next(error)
    }
}

// Update Product item information
exports.updateProductInfo = async (req, res, next) => {
    try {
        const data = req.body;
        const result= await updateProductServices(data);
        if (result?.modifiedCount > 0) {
            return sendResponse(res, {
                statusCode: httpStatus.OK,
                success: true,
                message: 'Product update successfully !'
            });
        }else{
            throw new ApiError(400, 'Product update failed !')
        }

    } catch (error) {
        next(error);
    }
}

// delete A Product item
exports.deleteAProductInfo = async (req, res, next) => {
    try {
        const id = req.body._id;
        const result = await deleteProductServices(id);
        if (result?.deletedCount > 0) {
            return sendResponse(res, {
                statusCode: httpStatus.OK,
                success: true,
                message: 'Product Delete successfully !'
            });
        } else {
            throw new ApiError(400, 'Product delete failed !');
        }
    } catch (error) {
        next(error);
    }
};


// search Product item
exports.getSearchProductInfo = async (req, res, next) => {
    try {
        const searchTerm = req.params.term;
        const searchData = { $regex: searchTerm, $options: 'i' }
        const data = await getSearchProductService(searchData);
        if (data) {
            return sendResponse(res, {
                statusCode: httpStatus.OK,
                success: true,
                message: 'Product get successfully !',
                data: data
            });
        }
        throw new ApiError(400, 'Product get failed !');
    } catch (error) {
        next(error);
    }
};
