const httpStatus = require("http-status");
const sendResponse = require("../../shared/send.response");
const ApiError = require("../../errors/ApiError");
const { getAllCategoryService, checkACategoryExits, postCategoryServices, updateCategoryServices, deleteCategoryServices, checkACategoryExitsInSubCategory, checkACategoryExitsInProducts, checkACategoryExitsInCategoryWhenUpdate } = require("../services/category.services");

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

// post a Category
exports.postCategory = async (req, res, next) => {
    try {
        const data = req.body;
        const exist = await checkACategoryExits(data?.category);
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
    } catch (error) {
        next(error)
    }
}

// Update Category item information
exports.updateCategoryInfo = async (req, res, next) => {
    try {
        const data = req.body;
        const checkExist = await checkACategoryExitsInCategoryWhenUpdate(data?.category);
        if(checkExist){
            throw new ApiError(400, 'Previously Added !')
        }
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
