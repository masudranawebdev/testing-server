const httpStatus = require("http-status");
const sendResponse = require("../../shared/send.response");
const ApiError = require("../../errors/ApiError");
const { getAllProductService, postProductServices, updateProductServices, deleteProductServices, getAProductService } = require("../services/products.services");

// get all Product
exports.getAllProduct = async (req, res, next) => {
    try {
        const result = await getAllProductService();
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

// get a Product
exports.getAProduct = async (req, res, next) => {
    try {
        const id = req.params.id;
        const result = await getAProductService(id);
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
        if (req.files && 'product' in req.files) {
        const ProductImage = req.files['product'][0];
        const Product = ProductImage?.filename;
        const data = { Product };
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
        }
        else {
            throw new ApiError(400, 'Image Upload Failed !')
        }
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
            sendResponse(res, {
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
            sendResponse(res, {
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
