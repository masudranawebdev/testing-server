const httpStatus = require("http-status");
const sendResponse = require("../../shared/send.response");
const ApiError = require("../../errors/ApiError");
const { getAllSliderService, postSliderServices, deleteSliderServices, updateSliderServices } = require("../services/slider.services");
const { FileUploadHelper } = require("../../helpers/image.upload");


// get all Slider
exports.getAllSlider = async (req, res, next) => {
    try {
        const result = await getAllSliderService();
        if(result){
            return sendResponse(res, {
                statusCode: httpStatus.OK,
                success: true,
                message: 'Slider Found successfully !',
                data: result,
            });
        }
        throw new ApiError(400, 'Slider Found Failed !')
    } catch (error) {
        next(error)
    }
}

// post a Slider
exports.postSlider = async (req, res, next) => {
    try {
        if (req.files && 'slider' in req.files) {
            const sliderImage = req.files['slider'][0];
            const slider_upload = await FileUploadHelper.uploadToCloudinary(sliderImage);
            slider = slider_upload?.secure_url;
            const data = { slider };
        const result = await postSliderServices(data);
        if(result){
            return sendResponse(res, {
                statusCode: httpStatus.OK,
                success: true,
                message: 'Slider Added successfully !',
                data: result,
            });
        }
        throw new ApiError(400, 'Slider Added Failed !')
        }
        else {
            throw new ApiError(400, 'Image Upload Failed !')
        }
    } catch (error) {
        next(error)
    }
}

// Update Slider item information
exports.updateSliderInfo = async (req, res, next) => {
    try {
        const data = req.body;
        if (req.files && 'slider' in req.files && req.body) {
            const sliderImage = req.files['slider'][0];
            const slider_upload = await FileUploadHelper.uploadToCloudinary(sliderImage);
            const slider = slider_upload?.secure_url;
            const sendData = { ...data, slider }
            const result= await updateSliderServices(sendData);
        if (result?.modifiedCount > 0) {
            return sendResponse(res, {
                statusCode: httpStatus.OK,
                success: true,
                message: 'Slider update successfully !'
            });
        }else{
            throw new ApiError(400, 'Slider update failed !')
        }
        }
        else{
            const result= await updateSliderServices(data);
        if (result?.modifiedCount > 0) {
            return sendResponse(res, {
                statusCode: httpStatus.OK,
                success: true,
                message: 'Slider update successfully !'
            });
        }else{
            throw new ApiError(400, 'Slider update failed !')
        }
        }

    } catch (error) {
        next(error);
    }
}

// delete A Slider item
exports.deleteASliderInfo = async (req, res, next) => {
    try {
        const id = req.body._id;
        const result = await deleteSliderServices(id);
        if (result?.deletedCount > 0) {
            return sendResponse(res, {
                statusCode: httpStatus.OK,
                success: true,
                message: 'Slider Delete successfully !'
            });
        } else {
            throw new ApiError(400, 'Slider delete failed !');
        }
    } catch (error) {
        next(error);
    }
};
