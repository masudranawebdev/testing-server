const httpStatus = require("http-status");
const ApiError = require("../../errors/ApiError");
const sendResponse = require("../../shared/send.response");
const { postSiteSettingServices, updateSiteSettingServices, getSiteSettingServices } = require("../services/setting.services");

// get site setting
exports.getSiteSettingInfo = async (req, res, next) => {
    try {
            const result = await getSiteSettingServices();
            if (result ) {
                sendResponse(res, {
                    statusCode: httpStatus.OK,
                    success: true,
                    message: 'Setting Get successfully !',
                    data: result
                });
            } else {
                throw new ApiError(400, 'Setting Get failed !');
            }
    } catch (error) {
        next(error);
    }
};

// update and first time post site setting
exports.updateSiteSettingInfo = async (req, res, next) => {
    try {
        const data = req.body;
        if(data?._id){
            const result = await updateSiteSettingServices(data);
            if (result?.modifiedCount ) {
                sendResponse(res, {
                    statusCode: httpStatus.OK,
                    success: true,
                    message: 'Setting Update successfully !'
                });
            } else {
                throw new ApiError(400, 'Setting Update failed !');
            }
        }else{
            const result = await postSiteSettingServices(data);
            if (result) {
                sendResponse(res, {
                    statusCode: httpStatus.OK,
                    success: true,
                    message: 'Setting Update successfully !'
                });
            } else {
                throw new ApiError(400, 'Setting Update failed !');
            }
        }
    } catch (error) {
        next(error);
    }
};