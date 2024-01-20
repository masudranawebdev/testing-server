const httpStatus = require("http-status");
const sendResponse = require("../../shared/send.response");
const ApiError = require("../../errors/ApiError");
const { getAllCollectionService, checkACollectionExits, postCollectionServices, updateCollectionServices, deleteCollectionServices, checkACollectionExitsInProducts, checkACollectionExitsInCollectionWhenUpdate } = require("../services/collection.services");
const { FileUploadHelper } = require("../../helpers/image.upload");

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
        if (req.files && 'collection_image' in req.files && req.body) {
            const collectionImage = req.files['collection_image'][0];
            const collection_upload = await FileUploadHelper.uploadToCloudinary(collectionImage);
            const collection_image = collection_upload?.secure_url;
            const requestData = req.body;
            const data = { ...requestData, collection_image }
            const exist = await checkACollectionExits(data?.collection_name);
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
        }
        else {
            throw new ApiError(400, 'Image Upload Failed !')
        }
    } catch (error) {
        next(error)
    }
}

// Update Collection item information
exports.updateCollectionInfo = async (req, res, next) => {
    try {
        const data = req.body;
        const checkExist = await checkACollectionExitsInCollectionWhenUpdate(data?.collection_name);
        if(checkExist && data?._id != checkExist?._id){
            throw new ApiError(400, 'Previously Added !')
        }
        if (req.files && 'collection_image' in req.files && req.body) {
            const collectionImage = req.files['collection_image'][0];
            const collection_upload = await FileUploadHelper.uploadToCloudinary(collectionImage);
            const collection_image = collection_upload?.secure_url;
            const sendData = { ...data, collection_image }
            const result= await updateCollectionServices(sendData);
        if (result?.modifiedCount > 0) {
            return sendResponse(res, {
                statusCode: httpStatus.OK,
                success: true,
                message: 'Sub_Category update successfully !'
            });
        }else{
            throw new ApiError(400, 'Sub_Category update failed !')
        }
        }
        else{
            const result= await updateCollectionServices(data);
        if (result?.modifiedCount > 0) {
            return sendResponse(res, {
                statusCode: httpStatus.OK,
                success: true,
                message: 'Sub_Category update successfully !'
            });
        }else{
            throw new ApiError(400, 'Sub_Category update failed !')
        }
        }

    } catch (error) {
        next(error);
    }
}

// delete A Collection item
exports.deleteACollectionInfo = async (req, res, next) => {
    try {
        const id = req.body._id;
        const existProduct = await checkACollectionExitsInProducts(id);
        if(existProduct?.length > 0){
            throw new ApiError(400, 'This collection is exist in products !');
        }
        const result = await deleteCollectionServices(id);
        if (result?.deletedCount > 0) {
            return sendResponse(res, {
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
