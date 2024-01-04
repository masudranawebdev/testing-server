const httpStatus = require("http-status");
const { getAllMenuService, postMenuServices, updateMenuServices, deleteMenuServices, checkAMenuExits } = require("../services/menu.services");
const sendResponse = require("../../shared/send.response");
const ApiError = require("../../errors/ApiError");

// get all Menu
exports.getAllMenu = async (req, res, next) => {
    try {
        const result = await getAllMenuService();
        if(result){
            return sendResponse(res, {
                statusCode: httpStatus.OK,
                success: true,
                message: 'Menu Found successfully !',
                data: result,
            });
        }
        throw new ApiError(400, 'Menu Found Failed !')
    } catch (error) {
        next(error)
    }
}

// post a Menu
exports.postMenu = async (req, res, next) => {
    try {
        const data = req.body;
        const exist = await checkAMenuExits(data?.menu);
        if(exist){
            throw new ApiError(400, 'Previously Added !')
        }
        const result = await postMenuServices(data);
        if(result){
            return sendResponse(res, {
                statusCode: httpStatus.OK,
                success: true,
                message: 'Menu Added successfully !',
                data: result,
            });
        }
        throw new ApiError(400, 'Menu Added Failed !')
    } catch (error) {
        next(error)
    }
}

// delete A Menu item
exports.deleteAMenuInfo = async (req, res, next) => {
    try {
        const id = req.body._id;
        const result = await deleteMenuServices(id);
        if (result?.deletedCount > 0) {
            sendResponse(res, {
                statusCode: httpStatus.OK,
                success: true,
                message: 'Menu Delete successfully !'
            });
        } else {
            throw new ApiError(400, 'Menu delete failed !');
        }
    } catch (error) {
        next(error);
    }
};
