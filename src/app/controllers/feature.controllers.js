const httpStatus = require("http-status");
const sendResponse = require("../../shared/send.response");
const ApiError = require("../../errors/ApiError");
const { getAllFeatureService, checkAFeatureExits, postFeatureServices, updateFeatureServices, deleteFeatureServices, checkAFeatureExitsInProductWhenUpdate, checkAFeatureExitsInProductWhenDelete } = require("../services/feature.services");

// get all Feature
exports.getAllFeature = async (req, res, next) => {
    try {
        const result = await getAllFeatureService();
        if(result){
            return sendResponse(res, {
                statusCode: httpStatus.OK,
                success: true,
                message: 'Feature Found successfully !',
                data: result,
            });
        }
        throw new ApiError(400, 'Feature Found Failed !')
    } catch (error) {
        next(error)
    }
}

// post a Feature
exports.postFeature = async (req, res, next) => {
    try {
        const data = req.body;
        const exist = await checkAFeatureExits(data?.feature);
        if(exist){
            throw new ApiError(400, 'Previously Added !')
        }
        const result = await postFeatureServices(data);
        if(result){
            return sendResponse(res, {
                statusCode: httpStatus.OK,
                success: true,
                message: 'Feature Added successfully !',
                data: result,
            });
        }
        throw new ApiError(400, 'Feature Added Failed !')
    } catch (error) {
        next(error)
    }
}

// delete A Feature item
exports.deleteAFeatureInfo = async (req, res, next) => {
    try {
        const id = req.body._id;
        const checkFeature = await checkAFeatureExitsInProductWhenDelete(id);
        if(checkFeature?.length > 0){
            throw new ApiError(400, 'This Feature is exist in a product !');
        }
        const result = await deleteFeatureServices(id);
        if (result?.deletedCount > 0) {
            return sendResponse(res, {
                statusCode: httpStatus.OK,
                success: true,
                message: 'Feature Delete successfully !'
            });
        } else {
            throw new ApiError(400, 'Feature delete failed !');
        }
    } catch (error) {
        next(error);
    }
};

// update A Feature item
exports.updateAFeatureInfo = async (req, res, next) => {
    try {
        const data = req.body;
        const checkExist = await checkAFeatureExitsInProductWhenUpdate(data?.feature);
        if(checkExist.length > 0 ){
            throw new ApiError(400, 'Previously Added !')
        }
        const result = await updateFeatureServices(data);
        if (result?.modifiedCount > 0) {
            return sendResponse(res, {
                statusCode: httpStatus.OK,
                success: true,
                message: 'Feature Update successfully !'
            });
        } else {
            throw new ApiError(400, 'Feature Update failed !');
        }
    } catch (error) {
        next(error);
    }
};
