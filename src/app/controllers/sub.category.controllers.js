const httpStatus = require("http-status");
const sendResponse = require("../../shared/send.response");
const ApiError = require("../../errors/ApiError");
const { getAllSub_CategoryService, checkASub_CategoryExits, updateSub_CategoryServices, deleteSub_CategoryServices, postSub_CategoryServices } = require("../services/sub.category.services");

// get all Sub_Category
exports.getAllSub_Category = async (req, res, next) => {
    try {
        const result = await getAllSub_CategoryService();
        if(result){
            return sendResponse(res, {
                statusCode: httpStatus.OK,
                success: true,
                message: 'Sub_Category Found successfully !',
                data: result,
            });
        }
        throw new ApiError(400, 'Sub_Category Found Failed !')
    } catch (error) {
        next(error)
    }
}

// post a Sub_Category
exports.postSub_Category = async (req, res, next) => {
    try {
        const data = req.body;
        const exist = await checkASub_CategoryExits(data?.sub_category);
        if(exist){
            throw new ApiError(400, 'Previously Added !')
        }
        const result = await postSub_CategoryServices(data);
        if(result){
            return sendResponse(res, {
                statusCode: httpStatus.OK,
                success: true,
                message: 'Sub_Category Added successfully !',
                data: result,
            });
        }
        throw new ApiError(400, 'Sub_Category Added Failed !')
    } catch (error) {
        next(error)
    }
}

// Update Sub_Category item information
exports.updateSub_CategoryInfo = async (req, res, next) => {
    try {
        const data = req.body;
        const result= await updateSub_CategoryServices(data);
        if (result?.modifiedCount > 0) {
            sendResponse(res, {
                statusCode: httpStatus.OK,
                success: true,
                message: 'Sub_Category update successfully !'
            });
        }else{
            throw new ApiError(400, 'Sub_Category update failed !')
        }

    } catch (error) {
        next(error);
    }
}

// delete A Sub_Category item
exports.deleteASub_CategoryInfo = async (req, res, next) => {
    try {
        const id = req.body._id;
        const result = await deleteSub_CategoryServices(id);
        if (result?.deletedCount > 0) {
            sendResponse(res, {
                statusCode: httpStatus.OK,
                success: true,
                message: 'Sub_Category Delete successfully !'
            });
        } else {
            throw new ApiError(400, 'Sub_Category delete failed !');
        }
    } catch (error) {
        next(error);
    }
};
