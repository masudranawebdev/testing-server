const httpStatus = require("http-status");
const sendResponse = require("../../shared/send.response");
const ApiError = require("../../errors/ApiError");
const { getAllCategoryService, checkACategoryExits, postCategoryServices, updateCategoryServices, deleteCategoryServices, checkACategoryExitsInSubCategory, checkACategoryExitsInProducts, checkACategoryExitsInCategoryWhenUpdate, getAllCategoryServiceMatchMenuId } = require("../services/category.services");

// get all Category
exports.getAllCategory = async (req, res, next) => {
    try {
        const result = await getAllCategoryService();
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

// get all Category for product add compare menu
exports.getAllCategoryMatchMenu = async (req, res, next) => {
    try {
        const menuId = req.query.menuId;
        const result = await getAllCategoryServiceMatchMenuId(menuId);
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

// post a Category
exports.postCategory = async (req, res, next) => {
    try {
        if (req.files && 'category_image' in req.files && req.body) {
        const categoryImage = req.files['category_image'][0];
            const category_image = categoryImage?.filename;
            const requestData = req.body;
            const data = { ...requestData, category_image }
        const exist = await checkACategoryExits(data?.category, data?.menuId);
        if(exist){
            throw new ApiError(400, 'Previously Added !')
        }
        const result = await postCategoryServices(data);
        if(result){
            return sendResponse(res, {
                statusCode: httpStatus.OK,
                success: true,
                message: 'Category Added successfully !',
                data: result,
            });
        }
        throw new ApiError(400, 'Category Added Failed !')
        }
        else {
            throw new ApiError(400, 'Image Upload Failed !')
        }
    } catch (error) {
        next(error)
    }
}

// Update Category item information
exports.updateCategoryInfo = async (req, res, next) => {
    try {
        const data = req.body;
        const checkExist = await checkACategoryExitsInCategoryWhenUpdate(data?.category);
        if(checkExist && data?._id != checkExist?._id){
            throw new ApiError(400, 'Previously Added !')
        }
        if (req.files && 'category_image' in req.files && req.body) {
        const categoryImage = req.files['category_image'][0];
            const category_image = categoryImage?.filename;
            const sendData = { ...data, category_image }
            const result= await updateCategoryServices(sendData);
        if (result?.modifiedCount > 0) {
            sendResponse(res, {
                statusCode: httpStatus.OK,
                success: true,
                message: 'Category update successfully !'
            });
        }else{
            throw new ApiError(400, 'Category update failed !')
        }
        }else{
        const result= await updateCategoryServices(data);
        if (result?.modifiedCount > 0) {
            sendResponse(res, {
                statusCode: httpStatus.OK,
                success: true,
                message: 'Category update successfully !'
            });
        }else{
            throw new ApiError(400, 'Category update failed !')
        }
    }

    } catch (error) {
        next(error);
    }
}

// delete A Category item
exports.deleteACategoryInfo = async (req, res, next) => {
    try {
        const id = req.body._id;
        const existSubCategory = await checkACategoryExitsInSubCategory(id);
        if(existSubCategory?.length > 0){
            throw new ApiError(400, 'This category is exist in sub category !');
        }
        const existProduct = await checkACategoryExitsInProducts(id);
        if(existProduct?.length > 0){
            throw new ApiError(400, 'This category is exist in products !');
        }
        const result = await deleteCategoryServices(id);
        if (result?.deletedCount > 0) {
            sendResponse(res, {
                statusCode: httpStatus.OK,
                success: true,
                message: 'Category Delete successfully !'
            });
        } else {
            throw new ApiError(400, 'Category delete failed !');
        }
    } catch (error) {
        next(error);
    }
};
