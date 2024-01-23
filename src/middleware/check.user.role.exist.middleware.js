const UserModel = require("../app/models/User.model");

// Find A User is Exist ?
exports.checkAUserExitsForVerify = async (phone) => {
    const FindUser = await UserModel.findOne({ phone: phone }).select('role phone');
    return FindUser;
}