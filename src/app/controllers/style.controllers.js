const httpStatus = require("http-status");
const sendResponse = require("../../shared/send.response");
const ApiError = require("../../errors/ApiError");
const { getAllStyleService, checkAStyleExits, postStyleServices, updateStyleServices, deleteStyleServices } = require("../services/style.services");

// get all Style
exports.getAllStyle = async (req, res, next) => {
    try {
        const result = await getAllStyleService();
        if(result){
            return sendResponse(res, {
                statusCode: httpStatus.OK,
                success: true,
                message: 'Style Found successfully !',
                data: result,
            });
        }
        throw new ApiError(400, 'Style Found Failed !')
    } catch (error) {
        next(error)
    }
}

// post a Style
exports.postStyle = async (req, res, next) => {
    try {
        const data = req.body;
        const exist = await checkAStyleExits(data?.style);
        if(exist){
            throw new ApiError(400, 'Previously Added !')
        }
        const result = await postStyleServices(data);
        if(result){
            return sendResponse(res, {
                statusCode: httpStatus.OK,
                success: true,
                message: 'Style Added successfully !',
                data: result,
            });
        }
        throw new ApiError(400, 'Style Added Failed !')
    } catch (error) {
        next(error)
    }
}

// Update Style item information
exports.updateStyleInfo = async (req, res, next) => {
    try {
        const data = req.body;
        const result= await updateStyleServices(data);
        if (result?.modifiedCount > 0) {
            sendResponse(res, {
                statusCode: httpStatus.OK,
                success: true,
                message: 'Style update successfully !'
            });
        }else{
            throw new ApiError(400, 'Style update failed !')
        }

    } catch (error) {
        next(error);
    }
}

// delete A Style item
exports.deleteAStyleInfo = async (req, res, next) => {
    try {
        const id = req.body._id;
        const result = await deleteStyleServices(id);
        if (result?.deletedCount > 0) {
            sendResponse(res, {
                statusCode: httpStatus.OK,
                success: true,
                message: 'Style Delete successfully !'
            });
        } else {
            throw new ApiError(400, 'Style delete failed !');
        }
    } catch (error) {
        next(error);
    }
};
