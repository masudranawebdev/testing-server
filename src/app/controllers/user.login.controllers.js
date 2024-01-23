const bcrypt = require("bcryptjs")
const saltRounds = 10
const dotenv = require("dotenv").config();
const jwt = require("jsonwebtoken");
const { findUser, updateLogUsersNewPasswordService, updateLogUsersChangeNewPasswordService } = require("../services/user.login.services");
const sendResponse = require("../../shared/send.response");
const httpStatus = require("http-status");
const ApiError = require("../../errors/ApiError");
const { SendForgetPasswordLink } = require("../../middleware/send.forget.password");

// login a user
exports.postLogUser = async (req, res, next) => {
    try {
        const { phone, password } = req.body;
        const user = await findUser(phone)
        if (user) {
            if(user?.verify == false){
                throw new ApiError(400, 'Need verify !')
            }
            const isPasswordValid = await bcrypt.compare(password, user?.password);

            if (isPasswordValid) {
                const token = jwt.sign({ phone }, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5hem11bEBnbWFpbC5jb20iLCJpYXQiOjE2OTQ0MzExOTF9.xtLPsJrvJ0Gtr4rsnHh1kok51_pU10_hYLilZyBiRAM");
                // const token = jwt.sign({ phone }, process.env.ACCESS_TOKEN);
                return sendResponse(res, {
                    statusCode: httpStatus.OK,
                    success: true,
                    message: 'User log in successfully !',
                    data: {token}
                });
            } else {
                return sendResponse(res, {
                    statusCode: httpStatus.BAD_REQUEST,
                    success: false,
                    message: 'Password not match !'
                });
            }
    

        } else {
            throw new ApiError(400, 'User not found !')
        }

    } catch (error) {
        next(error);
    }
}

// change a user password
exports.updateChangePasswordUser = async (req, res, next) => {
    try {
        const { phone, current_password, new_password } = req.body;
        const user = await findUser(phone)
        if (user) {
            if(user?.verify == false){
                throw new ApiError(400, 'Need verify !')
            }
            const isPasswordValid = await bcrypt.compare(current_password, user?.password);

            if (isPasswordValid) {
                bcrypt.hash(new_password, saltRounds, async function (err, hash) {
                    const updatePassword = await updateLogUsersChangeNewPasswordService(phone, hash);
                        if(updatePassword.modifiedCount > 0){
                            return sendResponse(res, {
                                statusCode: httpStatus.OK,
                                success: true,
                                message: 'Password update successfully !'
                            });
                        }else{
                            throw new ApiError(400, 'Something went wrong !')
                        }

                });
            } else {
                return sendResponse(res, {
                    statusCode: httpStatus.BAD_REQUEST,
                    success: false,
                    message: 'Current Password not match !'
                });
            }
    

        } else {
            throw new ApiError(400, 'User not found !')
        }

    } catch (error) {
        next(error);
    }
}

// send link to create new password if he forgot password
exports.postForgotPasswordUser = async (req, res, next) => {
    try {
        const { phone } = req.body;

        const user = await findUser(phone)
        if (!user) {
            throw new ApiError(400, 'User not found !')
        }

        await SendForgetPasswordLink(user?.phone);

        return sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Check Your phone !',
            data: {phone}
        });

    } catch (error) {
        next(error);
    }
}

// create new password
exports.postNewPasswordUser = async (req, res, next) => {
    try {
        const { phone, password } = req.body;

        bcrypt.hash(password, saltRounds, async function (err, hash) {
            const users = await updateLogUsersNewPasswordService(phone, hash);
            if (users?.modifiedCount > 0) {
                return sendResponse(res, {
                    statusCode: httpStatus.OK,
                    success: true,
                    message: 'Password change successfully !'
                });
            } else {
                throw new ApiError(400, 'Some thing went wrong !')
            }
        });

    } catch (error) {
        next(error)
    }
}