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
        const decode = await promisify(jwt.verify)(token, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5hem11bEBnbWFpbC5jb20iLCJpYXQiOjE2OTQ0MzExOTF9.xtLPsJrvJ0Gtr4rsnHh1kok51_pU10_hYLilZyBiRAM");
        // const decode = await promisify(jwt.verify)(token, process.env.ACCESS_TOKEN);

        const user = await findUserInfoServices(decode.phone);

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

        const phone = req.params.phone;

        const user= await findUserInfoServices(phone);

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
            return sendResponse(res, {
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