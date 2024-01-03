const UserModel = require("../models/User.model");

// Find A User is Exist ?
exports.checkAUserExits = async (email) => {
    const FindUser = await UserModel.findOne({ email: email });
    return FindUser;
}

// Registration A User
exports.postRegUserServices = async (data) => {
    const createUser = await UserModel.create(data);
    const userWithoutPassword = await UserModel.findById(createUser._id).select("-password");
    return userWithoutPassword;
};

// Update acoount verification true
exports.updateUserVerificationServices = async (id) => {
    const findUser = await UserModel.findOne({ _id: id })
    const users = await UserModel.updateOne(findUser, { verify: true }, {
        runValidators: true
    });
    return users;
}

// Update OTP and send new OTP
exports.updateRegUserOTPServices = async (otp, id) => {
    const findUser = await UserModel.findOne({ _id: id })
    const users = await UserModel.updateOne(findUser, { otp: otp }, {
        runValidators: true
    });
    return users;
}
