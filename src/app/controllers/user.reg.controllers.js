
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
        const inserted = await checkAUserExits(data?.email);
        if (inserted) {
            throw new ApiError(400, 'Previously Added !')
        }
        const otp = Math.floor(1000 + Math.random() * 9000);
        bcrypt.hash(data?.password, saltRounds, async function (err, hash) {
            const newUser = {
                email: data.email,
                password: hash,
                phone: data.phone,
                otp: otp,
                name: data?.name,
                role: "customer",
                verify: false
            }
            try {
                const result = await postRegUserServices(newUser);
                await SendOTP(result?.otp, result?.email);
                return sendResponse(res, {
                    statusCode: httpStatus.OK,
                    success: true,
                    message: 'Check your email !',
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
        const user = await checkAUserExits(data?.email);
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
        const { email } = req.body;
        const user = await checkAUserExits(email);

        if (!user) {
            throw new ApiError(400, 'User not found !')
        }
        const otp = Math.floor(1000 + Math.random() * 9000);
        const updateOTP = await updateRegUserOTPServices(otp, user?._id);
        if (updateOTP?.modifiedCount > 0) {
            const newOtp = await checkAUserExits(email);
            await SendOTP(newOtp?.otp, email);
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