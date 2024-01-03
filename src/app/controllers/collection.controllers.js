const httpStatus = require("http-status");
const sendResponse = require("../../shared/send.response");
const ApiError = require("../../errors/ApiError");
const { getAllCollectionService, checkACollectionExits, postCollectionServices, updateCollectionServices, deleteCollectionServices } = require("../services/collection.services");

// get all Collection
exports.getAllCollection = async (req, res, next) => {
    try {
        const result = await getAllCollectionService();
        if(result){
            return sendResponse(res, {
                statusCode: httpStatus.OK,
                success: true,
                message: 'Collection Found successfully !',
                data: result,
            });
        }
        throw new ApiError(400, 'Collection Found Failed !')
    } catch (error) {
        next(error)
    }
}

// post a Collection
exports.postCollection = async (req, res, next) => {
    try {
        const data = req.body;
        const exist = await checkACollectionExits(data?.collection);
        if(exist){
            throw new ApiError(400, 'Previously Added !')
        }
        const result = await postCollectionServices(data);
        if(result){
            return sendResponse(res, {
                statusCode: httpStatus.OK,
                success: true,
                message: 'Collection Added successfully !',
                data: result,
            });
        }
        throw new ApiError(400, 'Collection Added Failed !')
    } catch (error) {
        next(error)
    }
}

// Update Collection item information
exports.updateCollectionInfo = async (req, res, next) => {
    try {
        const data = req.body;
        const result= await updateCollectionServices(data);
        if (result?.modifiedCount > 0) {
            sendResponse(res, {
                statusCode: httpStatus.OK,
                success: true,
                message: 'Collection update successfully !'
            });
        }else{
            throw new ApiError(400, 'Collection update failed !')
        }

    } catch (error) {
        next(error);
    }
}

// delete A Collection item
exports.deleteACollectionInfo = async (req, res, next) => {
    try {
        const id = req.body._id;
        const result = await deleteCollectionServices(id);
        if (result?.deletedCount > 0) {
            sendResponse(res, {
                statusCode: httpStatus.OK,
                success: true,
                message: 'Collection Delete successfully !'
            });
        } else {
            throw new ApiError(400, 'Collection delete failed !');
        }
    } catch (error) {
        next(error);
    }
};
