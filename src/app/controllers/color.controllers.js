const httpStatus = require("http-status");
const ApiError = require("../../errors/ApiError");
const sendResponse = require("../../shared/send.response");
const { deleteColorServices, updateColorServices, postColorServices, getAllColorService, checkAColorExits, checkAColorExitsInProductWhenUpdate, checkAColorExitsInProduct } = require("../services/color.services");

// get all color
exports.getAllColor= async (req, res, next) => {
    try {
        const result = await getAllColorService();
        if(result){
            return sendResponse(res, {
                statusCode: httpStatus.OK,
                success: true,
                message: 'Color Found successfully !',
                data: result,
            });
        }
        throw new ApiError(400, 'Color Found Failed !')
    } catch (error) {
        next(error)
    }
}

// post a color
exports.postColor= async (req, res, next) => {
    try {
        const data = req.body;
        const exist = await checkAColorExits(data?.color);
        if(exist){
            throw new ApiError(400, 'Previously Added !')
        }
        const result = await postColorServices(data);
        if(result){
            return sendResponse(res, {
                statusCode: httpStatus.OK,
                success: true,
                message: 'Color Added successfully !',
                data: result,
            });
        }
        throw new ApiError(400, 'Color Added Failed !')
    } catch (error) {
        next(error)
    }
}

// delete A Color item
exports.deleteAColorInfo = async (req, res, next) => {
    try {
        const id = req.body._id;
        const checkInExist = await checkAColorExitsInProduct(id);
        if(checkInExist?.length > 0){
            throw new ApiError(400, 'This color is already exist in a product !');
        }
        const result = await deleteColorServices(id);
        if (result?.deletedCount > 0) {
            sendResponse(res, {
                statusCode: httpStatus.OK,
                success: true,
                message: 'Color Delete successfully !'
            });
        } else {
            throw new ApiError(400, 'Color delete failed !');
        }
    } catch (error) {
        next(error);
    }
};

// update A Color item
exports.updateAColorInfo = async (req, res, next) => {
    try {
        const data = req.body;
        const checkExist = await checkAColorExitsInProductWhenUpdate(data?.color);
        if(checkExist.length > 0 ){
            throw new ApiError(400, 'Previously Added !')
        }
        const result = await updateColorServices(data);
        if (result?.modifiedCount > 0) {
            sendResponse(res, {
                statusCode: httpStatus.OK,
                success: true,
                message: 'Color Update successfully !'
            });
        } else {
            throw new ApiError(400, 'Color Update failed !');
        }
    } catch (error) {
        next(error);
    }
};
