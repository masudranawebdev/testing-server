const { promisify } = require('util');
const dotenv = require("dotenv").config();
const jwt = require("jsonwebtoken");
const { findUserInfoServices, updateUserInfoService } = require('../services/get.me.services');
const sendResponse = require('../../shared/send.response');
const httpStatus = require('http-status');
const ApiError = require('../../errors/ApiError');

// get a user
exports.getMeUser = async (req, res, next) => {
    try {
        const token = await req.headers?.authorization?.split(" ")?.[1];
        // const token = req.headers?.authorization;
        const decode = await promisify(jwt.verify)(token, process.env.ACCESS_TOKEN);

        const user = await findUserInfoServices(decode.email);

        if (user) {
            return sendResponse(res, {
                statusCode: httpStatus.OK,
                success: true,
                message: 'User get successfully !',
                data: user
            });
        }
        throw new ApiError(400, 'User get failed !')

    } catch (error) {
        next(error)
    }
}

// get a user information
exports.getUserInformation = async (req, res, next) => {
    try {

        const email = req.params.email;

        const user= await findUserInfoServices(email);

        if (user) {
            return sendResponse(res, {
                statusCode: httpStatus.OK,
                success: true,
                message: 'User information get successfully !',
                data: user
            });
        }
        throw new ApiError(400, 'User information get failed !')

    } catch (error) {
        next(error)
    }
}

// Update his account information
exports.updateUserInfo = async (req, res, next) => {
    try {
        const data = req.body;
        const result = await updateUserInfoService(data);
        if (result?.modifiedCount > 0) {
            sendResponse(res, {
                statusCode: httpStatus.OK,
                success: true,
                message: 'User information update successfully !'
            });
        } else {
            throw new ApiError(400, 'User information update failed !')
        }

    } catch (error) {
        next(error);
    }
}