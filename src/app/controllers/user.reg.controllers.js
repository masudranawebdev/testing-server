
const bcrypt = require("bcryptjs");
const ApiError = require("../../errors/ApiError");
const sendResponse = require("../../shared/send.response");
const httpStatus = require("http-status");
const { checkAUserExits, postRegUserServices, updateRegUserOTPServices, updateUserVerificationServices, findAllUser, deleteUserServices } = require("../services/user.reg.services");
const { SendOTP } = require("../../middleware/sendOTP");
const UserModel = require("../models/User.model");
const saltRounds = 10;


// get all user
exports.getAllUser = async (req, res, next) => {
    try {
        const {page, limit} = req.query;
        const pageNumber = Number(page);
        const limitNumber = Number(limit);
        const skip = (pageNumber - 1) * limitNumber;
        const result = await findAllUser(limitNumber, skip);
        const total = await UserModel.countDocuments();
        if(result){
            return sendResponse(res, {
                statusCode: httpStatus.OK,
                success: true,
                message: 'Users Found successfully !',
                data: result,
                totalData: total
            });
        }
        throw new ApiError(400, 'Users Found Failed !')
    } catch (error) {
        next(error)
    }
}


// registration a user
exports.postRegUser = async (req, res, next) => {
    try {
        const data = req.body;
        const phone = data?.phone;
        const cleanedPhone = phone.startsWith('+88') ? phone.slice(3) :
            phone.startsWith('88') ? phone.slice(2) :
                phone;
        
        if(cleanedPhone.startsWith('010') || cleanedPhone.startsWith('012') || cleanedPhone.startsWith('011')){
            throw new ApiError(400, "Number formet not right !");
        }

        const inserted = await checkAUserExits(cleanedPhone);
        if (inserted) {
            throw new ApiError(400, 'Previously Added !')
        }
        const otp = Math.floor(1000 + Math.random() * 9000);
        bcrypt.hash(data?.password, saltRounds, async function (err, hash) {
            const newUser = {
                password: hash,
                phone: cleanedPhone,
                otp: otp,
                name: data?.name,
                role: "customer",
                verify: false
            }
            try {
                const result = await postRegUserServices(newUser);
                await SendOTP(result?.otp,result?.phone);
                return sendResponse(res, {
                    statusCode: httpStatus.OK,
                    success: true,
                    message: 'Check your Message !',
                    data: result,
                });
            } catch (error) {
                next(error);
            }
        });
    } catch (error) {
        next(error)
    }
}

// verify his account with OTP
exports.postRegUserAccountVerify = async (req, res, next) => {
    try {
        const data = req.body;
        const user = await checkAUserExits(data?.phone);
        if (!user) {
            throw new ApiError(400, 'User not found !')
        }
        const otp = user?.otp;
        if (data?.otp == otp) {
            const userVerify = await updateUserVerificationServices(user?._id);
            if (userVerify?.modifiedCount > 0) {
                return sendResponse(res, {
                    statusCode: httpStatus.OK,
                    success: true,
                    message: 'OTP match successfully !'
                });
            } else {
                throw new ApiError(400, 'Something went wrong !')
            }
        } else {
            return sendResponse(res, {
                statusCode: httpStatus.BAD_REQUEST,
                success: false,
                message: 'OTP match failed !'
            });
        }
    } catch (error) {
        next(error);
    }
}

// resend his OTP and also update in DB
exports.postRegUserResendCode = async (req, res, next) => {
    try {
        const { phone } = req.body;
        const cleanedPhone = phone.startsWith('+88') ? phone.slice(3) :
            phone.startsWith('88') ? phone.slice(2) :
                phone;

        if(cleanedPhone.startsWith('010') || cleanedPhone.startsWith('012') || cleanedPhone.startsWith('011')){
            throw new ApiError(400, "Number formet not right !");
        }
        const user = await checkAUserExits(cleanedPhone);

        if (!user) {
            throw new ApiError(400, 'User not found !')
        }
        const otp = Math.floor(1000 + Math.random() * 9000);
        const updateOTP = await updateRegUserOTPServices(otp, user?._id);
        if (updateOTP?.modifiedCount > 0) {
            const newOtp = await checkAUserExits(phone);
            await SendOTP(newOtp?.otp, phone);
            return sendResponse(res, {
                statusCode: httpStatus.OK,
                success: true,
                message: 'New OTP send !',
                data: newOtp
            });
        } else {
            throw new ApiError(400, 'Some thing went wrong !')
        }
    } catch (error) {
        next(error)
    }
}

// delete a user
exports.deleteAUser = async (req, res, next) => {
    try {
        const data = req.body;
            const userDelete = await deleteUserServices(data?._id);
            if (userDelete?.deletedCount > 0) {
                return sendResponse(res, {
                    statusCode: httpStatus.OK,
                    success: true,
                    message: 'User delete successfully !'
                });
            } else {
                throw new ApiError(400, 'Something went wrong !')
            }
    } catch (error) {
        next(error);
    }
}