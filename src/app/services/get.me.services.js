const UserModel = require("../models/User.model");

// Check a user is exists?
exports.findUserInfoServices = async (email) => {
    const users = await UserModel.findOne({ email: email }).select('-password -verify -otp');
    return users;
}

// update user information
exports.updateUserInfoService = async (data) => {
    const updateUserInfo = await UserModel.findOne({email: data?.email})
    const users = await UserModel.updateOne(updateUserInfo, data, {
        runValidators: true
    });
    return users;
}
