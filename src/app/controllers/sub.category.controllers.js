const httpStatus = require("http-status");
const sendResponse = require("../../shared/send.response");
const ApiError = require("../../errors/ApiError");
const { getAllSub_CategoryService, checkASub_CategoryExits, updateSub_CategoryServices, deleteSub_CategoryServices, postSub_CategoryServices, checkASubCategoryExitsInProducts, getAllCategoryServiceMatchMenuIdAndCategoryId } = require("../services/sub.category.services");

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

// get all Category for product add compare menu and category
exports.getAllCategoryMatchMenuAndCategory = async (req, res, next) => {
    try {
        const menuId = req.query.menuId;
        const categoryId = req.query.categoryId;
        const result = await getAllCategoryServiceMatchMenuIdAndCategoryId(menuId, categoryId);
        if(result){
            return sendResponse(res, {
                statusCode: httpStatus.OK,
                success: true,
                message: 'Category Found successfully !',
                data: result,
            });
        }
        throw new ApiError(400, 'Category Found Failed !')
    } catch (error) {
        next(error)
    }
}

// post a Sub_Category
exports.postSub_Category = async (req, res, next) => {
    try {
        if (req.files && 'sub_category_image' in req.files && req.body) {
        const categoryImage = req.files['sub_category_image'][0];
            const sub_category_image = categoryImage?.filename;
            const requestData = req.body;
            const data = { ...requestData, sub_category_image }
        const exist = await checkASub_CategoryExits(data?.sub_category, data?.menuId, data?.categoryId);
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
        }
        else {
            throw new ApiError(400, 'Image Upload Failed !')
        }
    } catch (error) {
        next(error)
    }
}

// Update Sub_Category item information
exports.updateSub_CategoryInfo = async (req, res, next) => {
    try {
        const data = req.body;
        const checkExist = await checkASub_CategoryExits(data?.sub_category, data?.menuId, data?.categoryId);
        if(checkExist && data?._id != checkExist?._id){
            throw new ApiError(400, 'Previously Added !')
        }
        if (req.files && 'sub_category_image' in req.files && req.body) {
        const categoryImage = req.files['sub_category_image'][0];
            const sub_category_image = categoryImage?.filename;
            const sendData = { ...data, sub_category_image }
            const result= await updateSub_CategoryServices(sendData);
        if (result?.modifiedCount > 0) {
            sendResponse(res, {
                statusCode: httpStatus.OK,
                success: true,
                message: 'Sub_Category update successfully !'
            });
        }else{
            throw new ApiError(400, 'Sub_Category update failed !')
        }
        }
        else{
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
        }

    } catch (error) {
        next(error);
    }
}

// delete A Sub_Category item
exports.deleteASub_CategoryInfo = async (req, res, next) => {
    try {
        const id = req.body._id;
        const existProduct = await checkASubCategoryExitsInProducts(id);
        if(existProduct?.length > 0){
            throw new ApiError(400, 'This category is exist in products !');
        }
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
