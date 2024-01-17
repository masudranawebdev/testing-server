
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

        if(discount_price == true && sort){
            if (sort === 'asc') {
                sendData = discountFilterData.slice().sort((a, b) => (a.discount_price || 0) - (b.discount_price || 0));
            } else if (sort === 'des') {
                sendData = discountFilterData.slice().sort((a, b) => (b.discount_price || 0) - (a.discount_price || 0));
            }else{
                sendData = discountFilterData.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            }
        }else if(sort){
            if (sort === 'asc') {
                sendData = discountFilterData.slice().sort((a, b) => (a.discount_price || 0) - (b.discount_price || 0));
            } else if (sort === 'des') {
                sendData = discountFilterData.slice().sort((a, b) => (b.discount_price || 0) - (a.discount_price || 0));
            }else{
                sendData = discountFilterData.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            }
        }

        return sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Product information get successfully !',
            data: data
        });

    } catch (error) {
        next(error)
    }
}
