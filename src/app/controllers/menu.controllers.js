const httpStatus = require("http-status");
const { getAllMenuService, postMenuServices, updateMenuServices, deleteMenuServices, checkAMenuExits, checkAMenuExitsInCategory, checkAMenuExitsInSubCategory, checkAMenuExitsInMenu, checkAMenuExitsInProducts, getAllCategoryAndSubcategoryServices } = require("../services/menu.services");
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
        const existCategory = await checkAMenuExitsInCategory(id);
        if(existCategory?.length > 0){
            throw new ApiError(400, 'This menu is exist in category !');
        }
        const existSubCategory = await checkAMenuExitsInSubCategory(id);
        if(existSubCategory?.length > 0){
            throw new ApiError(400, 'This menu is exist in sub category !');
        }
        const existProduct = await checkAMenuExitsInProducts(id);
        if(existProduct?.length > 0){
            throw new ApiError(400, 'This menu is exist in products !');
        }
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

// update A Menu item
exports.updateAMenuInfo = async (req, res, next) => {
    try {
        const data = req.body;
        const checkExist = await checkAMenuExitsInMenu(data?.menu);
        if(checkExist){
            throw new ApiError(400, 'Previously Added !')
        }
        const result = await updateMenuServices(data);
        if (result?.modifiedCount > 0) {
            sendResponse(res, {
                statusCode: httpStatus.OK,
                success: true,
                message: 'Menu Update successfully !'
            });
        } else {
            throw new ApiError(400, 'Menu Update failed !');
        }
    } catch (error) {
        next(error);
    }
};

// get all Categry and sub category for hover
exports.getAllCategoryAndSubCategory = async (req, res, next) => {
    try {
        const menuId = req.params.menuId;
        const result = await getAllCategoryAndSubcategoryServices(menuId);
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
