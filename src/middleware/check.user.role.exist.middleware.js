const UserModel = require("../app/models/User.model");

// Find A User is Exist ?
exports.checkAUserExitsForVerify = async (email) => {
    const FindUser = await UserModel.findOne({ email: email }).select('role email');
    return FindUser;
}