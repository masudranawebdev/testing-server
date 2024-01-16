const bcrypt = require("bcryptjs")
const saltRounds = 10
const dotenv = require("dotenv").config();
const jwt = require("jsonwebtoken");
const { findUser, updateLogUsersNewPasswordService } = require("../services/user.login.services");
const sendResponse = require("../../shared/send.response");
const httpStatus = require("http-status");
const ApiError = require("../../errors/ApiError");
const { SendForgetPasswordLink } = require("../../middleware/send.forget.password");

// login a user
exports.postLogUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await findUser(email)
        if (user) {
            if(user?.verify == false){
                throw new ApiError(400, 'Need verify !')
            }
            const isPasswordValid = await bcrypt.compare(password, user?.password);

            if (isPasswordValid) {
                const token = jwt.sign({ email }, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5hem11bEBnbWFpbC5jb20iLCJpYXQiOjE2OTQ0MzExOTF9.xtLPsJrvJ0Gtr4rsnHh1kok51_pU10_hYLilZyBiRAM");
                // const token = jwt.sign({ email }, process.env.ACCESS_TOKEN);
                return sendResponse(res, {
                    statusCode: httpStatus.OK,
                    success: true,
                    message: 'User log in successfully !',
                    data: {token}
                });
            } else {
                sendResponse(res, {
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

// send link to create new password if he forgot password
exports.postForgotPasswordUser = async (req, res, next) => {
    try {
        const { email } = req.body;

        const user = await findUser(email)
        if (!user) {
            throw new ApiError(400, 'User not found !')
        }

        await SendForgetPasswordLink(user?.email);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Check Your Email !',
            data: {email}
        });

    } catch (error) {
        next(error);
    }
}

// create new password
exports.postNewPasswordUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        bcrypt.hash(password, saltRounds, async function (err, hash) {
            const users = await updateLogUsersNewPasswordService(email, hash);
            if (users?.modifiedCount > 0) {
                sendResponse(res, {
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