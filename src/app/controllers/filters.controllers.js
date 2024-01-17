
const dotenv = require("dotenv").config();
const sendResponse = require('../../shared/send.response');
const httpStatus = require('http-status');
const ApiError = require('../../errors/ApiError');
const { getFilterDataServices } = require("../services/filter.services");

// get filter data
exports.getFilterDataControllers = async (req, res, next) => {

    try {
        const { discount_price, categoryId, subCategoryId, collectionId, styleId, featureId, colorId, sort } = req.query;

        const conditions = {};

        if (categoryId) {
            conditions.categoryId = categoryId;
        }

        if (subCategoryId) {
            conditions.subCategoryId = subCategoryId;
        }

        if (collectionId) {
            conditions.collectionId = collectionId;
        }

        if (styleId) {
            conditions.styleId = styleId;
        }

        if (featureId) {
            conditions.featureId = featureId;
        }

        if (colorId) {
            conditions.colorId = colorId;
        }

        const query = conditions;

        const data= await getFilterDataServices(query);

        const discountFilterData = data.filter(product => product.discount_price !== null);

        if(discount_price == "true" && sort){
            if (sort === 'asc') {
                const sendData = discountFilterData.slice().sort((a, b) => (a.price || 0) - (b.price || 0));
                return sendResponse(res, {
                statusCode: httpStatus.OK,
                success: true,
                message: 'Product information get successfully !',
                data: sendData
            });
            } else if (sort === 'desc') {
                const sendData = discountFilterData.slice().sort((a, b) => (b.price || 0) - (a.price || 0));
                return sendResponse(res, {
                statusCode: httpStatus.OK,
                success: true,
                message: 'Product information get successfully !',
                data: sendData
            });
            }else{
                const sendData = discountFilterData.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                return sendResponse(res, {
                statusCode: httpStatus.OK,
                success: true,
                message: 'Product information get successfully !',
                data: sendData
            });
            }
        }else if(sort){
            if (sort === 'asc') {
                const sendData = data.slice().sort((a, b) => (a.price || 0) - (b.price || 0));
                return sendResponse(res, {
                statusCode: httpStatus.OK,
                success: true,
                message: 'Product information get successfully !',
                data: sendData
            });
            } else if (sort === 'desc') {
                const sendData = data.slice().sort((a, b) => (b.price || 0) - (a.price || 0));
                return sendResponse(res, {
                statusCode: httpStatus.OK,
                success: true,
                message: 'Product information get successfully !',
                data: sendData
            });
            }else{
                const sendData = data.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                return sendResponse(res, {
                statusCode: httpStatus.OK,
                success: true,
                message: 'Product information get successfully !',
                data: sendData
            });
            }
        }else if(discount_price == "true"){
            return sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Product information get successfully !',
            data: discountFilterData
        });
        }else{
            return sendResponse(res, {
                statusCode: httpStatus.OK,
                success: true,
                message: 'Product information get successfully !',
                data: data
            });
        }

    } catch (error) {
        next(error)
    }
}
