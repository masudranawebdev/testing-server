const UserModel = require("../models/User.model");

// Check a user is exists?
exports.findUserInfoServices = async (phone) => {
    const users = await UserModel.findOne({ phone: phone }).select('-password -verify -otp');
    return users;
}

// update user information
exports.updateUserInfoService = async (data) => {
    const updateUserInfo = await UserModel.findOne({phone: data?.phone})
    const users = await UserModel.updateOne(updateUserInfo, data, {
        runValidators: true
    });
    return users;
}
