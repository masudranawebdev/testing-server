const UserModel = require("../models/User.model");

// Find A User is Exist ?
exports.checkAUserExits = async (email) => {
    const FindUser = await UserModel.findOne({ email: email });
    return FindUser;
}

// Registration A User
exports.postRegUserServices = async (data) => {
    const createUser = await UserModel.create(data);
    return createUser;
}