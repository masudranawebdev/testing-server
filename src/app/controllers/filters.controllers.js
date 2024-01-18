
const sendResponse = require('../../shared/send.response');
const httpStatus = require('http-status');
const { getFilterDataServices } = require("../services/filter.services");
const MenuModel = require("../models/Menu.model");
const CategoryModel = require("../models/Category.model");
const Sub_CategoryModel = require("../models/Sub.category.model");
const CollectionModel = require("../models/Collection.model");
const StyleModel = require("../models/Style.model");
const FeatureModel = require("../models/Feature.model");
const ColorModel = require("../models/Color.model");

// get filter data
exports.getFilterDataControllers = async (req, res, next) => {

    try {

        const {gender, category, sub_category, style, color, feature, collection, discount_price, sort, keyword} = req.query;

        const conditions = {};

        if (keyword) {
            conditions.title = { $regex: keyword, $options: 'i' };
        }

        if (gender) {
            const menuId = await MenuModel.findOne({slug: gender}).select('_id');
            conditions.menuId = menuId?._id.toString();
        }

        if (category) {
            const categoryId = await CategoryModel.findOne({slug: category}).select('_id');
            conditions.categoryId = categoryId?._id.toString();
        }

        if (sub_category) {
            const subCategoryId = await Sub_CategoryModel.findOne({slug: sub_category}).select('_id');
            conditions.subCategoryId = subCategoryId?._id.toString();
        }

        if (collection) {
            const collectionId = await CollectionModel.findOne({slug: collection}).select('_id');
            conditions.collectionId = collectionId?._id.toString();
        }

        if (style) {
            const styleId = await StyleModel.findOne({slug: style}).select('_id');
            conditions.styleId = styleId?._id.toString();
        }

        if (feature) {
            const featureId = await FeatureModel.findOne({slug: feature}).select('_id');
            conditions.featureId = featureId?._id.toString();
        }

        if (color) {
            const colorId = await ColorModel.findOne({slug: color}).select('_id');
            conditions.colorId = colorId?._id.toString();
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
